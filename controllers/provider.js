const Provider = require('../models/Provider');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async function (req, res) {
  try {
    const apps = await Provider.find({});
    return res.status(200).json(apps);
  } catch (error) {
    errorHandler(res, error);
  }
};
