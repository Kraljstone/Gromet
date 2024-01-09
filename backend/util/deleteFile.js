const fs = require('fs');
const fsPromises = require('fs').promises;

async function deleteFile(filePath) {
  try {
    const fileExists = fs.existsSync(filePath);
    console.log("file exists?", fileExists);
    if(!fileExists){
      return;
    }
    await fsPromises.unlink(filePath);
    console.log(`File ${filePath} has been deleted.`);
  } catch (err) {
    console.error("error deleting file:", err);
  }
}


module.exports = deleteFile;