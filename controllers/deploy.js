const amqp = require('amqplib/callback_api');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandler');


module.exports.deploy = async function (req, res) {
  console.log(req.body);
  let user = req.user.name
  let email = req.user.email;
  amqp.connect(keys.amq, function (error, connection) {
    if (error) {
      errorHandler(res, error);
      res.status(500).json('the message has not been sent');
    }
    connection.createChannel((error, channel) => {
      if (error) {
        errorHandler(res, error);
      }
      let queueName = 'applicationDeploymentRequest';
      let message = { body: req.body, email, user };
      channel.assertQueue(queueName, {
        durable: false,
      });
      channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
      setTimeout(() => {
        connection.close();
      }, 1000);
    });
  });
  res.status(200).json('the message has been sent');
};
