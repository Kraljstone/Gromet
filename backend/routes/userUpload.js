const express = require('express');
const router = express.Router();
const uploadController = require('../controller/uploadController.js');

router.post('/upload', uploadController);

module.exports = router;
