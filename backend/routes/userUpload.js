const express = require('express');
const router = express.Router();

const processExcelFileController = require('../controller/processExcelFileController.js');
router.post('/upload', processExcelFileController);

const processJsonDataController = require('../controller/processJsonDataController.js');
router.post('/download', processJsonDataController);

module.exports = router;
