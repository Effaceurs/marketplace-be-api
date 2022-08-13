const AppVersion = require('../models/AppVersion');
const errorHandler = require('../utils/errorHandler');

module.exports.get = async function (req, res) {
  try {
    console.log(req.query)
    const apps = await AppVersion.find({image : req.query.image, provider : req.query.provider});
    return res.status(200).json(apps);
  } catch (error) {
    errorHandler(res, error);
  }
};