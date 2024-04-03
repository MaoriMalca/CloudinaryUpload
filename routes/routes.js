const express = require('express');
const router = express.Router();
const uploadImage = require('./controllers/uploadImage');
const persistImage = require('./controllers/persistImage');

// server response for connection
router.get('/', (request, response) => {
    response.json({ message: 'server response' });
});

// image upload 
router.post('/upload-image', uploadImage.uploadImage);
// persist image
router.post('/persist-image', persistImage.persistImage);


module.exports = router;

