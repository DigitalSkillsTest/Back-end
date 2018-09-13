const multer = require('multer');

const UPLOAD_PATH = 'public/uploads';

// set upload path and file name
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

// multer configuration
const upload = multer({ storage });

module.exports = upload;
