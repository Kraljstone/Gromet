const express = require('express');
const multer = require('multer');
const cors = require('cors');
const upload = multer({ dest: 'uploads/' });

const userUpload = require('./routes/userUpload.js');

const app = express();
app.use(cors());

app.use('/api', upload.single('file'), userUpload);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
