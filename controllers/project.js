const Project = require('../models/Project')
const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
  try {
    const projects = await Project.find()
    const user = await User.findOne({ _id: req.query.user })
    const userProjects = projects.filter(value => value.members.includes(user.name))
    return res.status(200).json(userProjects)
  } catch (error) {
    errorHandler(res, error)
  }
}

module.exports.getProject = async function (req, res) {
  try {
    console.log(req.params.id)
    const project = await Project.findOne({ _id: req.params.id })
    console.log(project)
    return res.status(200).json(project)
  } catch (error) {
    errorHandler(res, error)
  }
}
