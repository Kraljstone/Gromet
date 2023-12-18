const express = require('express');
const router = express.Router();
const processExcelFileController = require('../controller/processExcelFileController.js');

router.post('/upload', processExcelFileController);

module.exports = router;
