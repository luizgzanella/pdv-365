var Minio = require('minio');

const minioClient = new Minio.Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: 'minio',
  secretKey: 'minio123',
});

const bucketExists = (req, res) => {
  minioClient.bucketExists('mybucket', (error) => {
    console.log(error);
    if (error) {
      minioClient.makeBucket('mybucket', 'us-east-1', function (err) {
        if (err) return console.log('Error creating bucket.', err);
        console.log('Bucket created successfully in "us-east-1".');
      });
    } else {
      console.log('bucket exists');
    }
  });
};

const uploadFile = (req, res) => {
  const fileName = `${Date.now()}.jpg`;
  minioClient.putObject(
    'mybucket',
    fileName,
    req.file.buffer,
    function (error, etag) {
      if (error) {
        return console.log(error);
      }
      minioClient.presignedGetObject(
        'mybucket',
        fileName,
        24 * 60 * 60,
        function (err, presignedUrl) {
          if (err) return console.log(err);
          res.send({ url: presignedUrl });
        }
      );
    }
  );
};

module.exports = { uploadFile, bucketExists };
