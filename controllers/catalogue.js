const Catalogue = require('../models/Catalogue');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async function (req, res) {
  try {
    const catalogues = await Catalogue.find();
    return res.status(200).json(catalogues);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.add = async function(req, res) {
  try{
    console.log(req.body)
    const catalogue = await new Catalogue({
      image: req.body.image,
      provider: req.body.provider,
    }).save();
    res.status(200).json(catalogue);
  }
  catch (error) {
    console.log(res, error)
    errorHandler(res, error);
  }
}