const Application = require('../models/Application')
const Group = require('../models/Group')
const errorHandler = require('../utils/errorHandler')
const amqp = require('amqplib/callback_api')
const keys = require('../config/keys')

module.exports.getAll = async function (req, res) {
  try {
    const groups = await Group.find()
    const memberOfGroups = groups.filter(value => value.members.includes(req.user.name))
    const users = new Set((memberOfGroups.flatMap(value => value.members)))
    const applications = []
    for (const user of users) {
      const apps = await Application.find({ user })
      applications.push(...apps)
    }
    return res.status(200).json(applications)
  } catch (error) {
    errorHandler(res, error)
  }
}

module.exports.create = async function (req, res) {
  console.log(req.body)
  console.log(req.user)

  try {
    const order = await new Application({
      name: req.body.name,
      image: req.body.image,
      userId: req.user.id,
      user: req.user.name,
      version: req.body.version,
      replicas: req.body.replicas,
      url: 'indentifying',
      status: 'pending',
      provider: req.body.provider
    }).save()
    console.log(order)
    res.status(200).json(order)
  } catch (error) {
    console.log(error)
    errorHandler(res, error)
  }
}

module.exports.patch = async function (req, res) {
  const { _id: id, status, url } = req.body
  const { email } = req.user
  const user =
  req.user.email.split('@')[0] +
  req.user.email.split('@')[1].replace('.', '-')
  try {
    const update = await Application.findOneAndUpdate(
      {
        _id: id
      }, {
        status,
        url
      }
    )

    if (status === 'deleting') {
      amqp.connect(keys.amq, function (error, connection) {
        if (error) {
          errorHandler(res, error)
          res.status(500).json('the message has not been sent')
        }
        connection.createChannel((error, channel) => {
          if (error) {
            errorHandler(res, error)
          }
          const queueName = 'applicationDeletionRequest'
          const message = { body: req.body, email, user }
          channel.assertQueue(queueName, {
            durable: false
          })
          channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)))
          setTimeout(() => {
            connection.close()
          }, 1000)
        })
      })
    }

    res.status(200).json(update)
  } catch (error) {
    console.log(error)
    errorHandler(res, error)
  }
}
