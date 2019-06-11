const express = require('express');
const fileUpload = require('express-fileupload');
const crypto = require('crypto');
const fs = require('fs');
const app = express();
const PORT = 8000;
const SUCCESS_STATUS=200;
const MAX_FILE_SIZE = 1.5 * 1024 * 1024;


function uploadfile(req, res) {
    let inputFile;
    let uploadPath;
    let allowedExtensions;
    
    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('No file was uploaded.');   
    }
    
    inputFile = req.files.inputFile;
    allowedExtensions = ['image/png','image/jpeg','image/gif'];
    
    if (inputFile.size > MAX_FILE_SIZE ) {
        return res.status(400).send('File size is more than 1.5 MB');
    }
    
    if (!allowedExtensions.includes(inputFile.mimetype)) {
        return res.status(400).send('Only png, jpg and gif files are allowed to upload.');    
    }
    
    let checksumValue = calculateChecksum(inputFile.data);
    uploadPath = getFilePath(checksumValue);
    inputFile.mv(uploadPath, function(err){
    if (err) {
        return res.status(500).send(err);
    } 
    return res.status(SUCCESS_STATUS).send('File uploaded: checksum = '+checksumValue)
    });
}

// Sets the checksum value as the file name in the path
function getFilePath(checksum) {
    return __dirname + '/' + checksum;
}

// For the given checksum checks if the file exists
function checkFileExists(req, res) {
    filePath = getFilePath(req.params.checksum);
    fs.access (filePath, fs.F_OK, (err) => {
        if (err) {
            console.log(err);
            return res.status(404).send('File does not Exist.');
        } else {
            return res.status(SUCCESS_STATUS).send('File Exists.');
        }
    });
}

// Calculates checksum for the uploaded file using SHA256 algorithm
function calculateChecksum(data) {
  return crypto
    .createHash('sha256')
    .update(data, 'utf8')
    .digest('hex')
}

app.use('/uploadForm', express.static(__dirname + '/index.html'));
app.use(fileUpload());

app.get('/', function(req,res){
    res.send('Welcome to the home page.');
});

app.post('/upload', uploadfile);

app.get('/:checksum', checkFileExists);

app.listen(PORT, function() {
    console.log('Server is listening on http://localhost:' + PORT);
});
