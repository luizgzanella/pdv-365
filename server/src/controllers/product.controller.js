const Product = require('../models/product.model.js');

const createProduct = async (req, res) => {
  const { name, description, price, file } = req.body;
  const image = file;

  const product = await Product.create({ name, description, price, image });

  return res.status(201).json({
    product,
  });
};

const updateProduct = async (req, res) => {
  const updatedProduct = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
  };
  const { id } = req.params;

  await Product.update(updatedProduct, {
    where: {
      id,
    },
  });

  res.status(200).json({
    data: {
      status: 'success',
    },
  });
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findOne({ where: { id } });
  if (!product) {
    return res.status(404).json({ status: 'not found' });
  }
  product.destroy();

  res.status(200).json({
    status: 'success',
  });
};

const getProducts = async (req, res, next) => {
  const productsList = await Product.findAll({});

  res.status(200).json({
    productsList,
  });
};
module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
};
