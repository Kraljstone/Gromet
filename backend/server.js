const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const upload = multer({ dest: 'uploads/' });

const userUpload = require('./routes/userUpload.js');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());


app.use('/api', upload.single('file'), userUpload);

app.listen(PORT, () => {
  console.log('Server is running on port:', PORT);
});
console.log("Process", process.env.NODE_ENV)