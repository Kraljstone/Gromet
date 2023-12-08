const express = require('express');
const router = express.Router();
const processExcelFileController = require('../controller/processExcelFileController.js');
const mapLocation = require('../controller/mapLocationController.js');

router.post('/upload', processExcelFileController);
router.get('/mapLocation', mapLocation);

module.exports = router;
