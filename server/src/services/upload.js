const multer = require('multer');
const app = require('../app');

const handleError = (err, res) => {
  res.status(500).end('Ocorreu um erro');
};

const upload = multer({
  dest: './temp/images',
});

module.exports = upload;
