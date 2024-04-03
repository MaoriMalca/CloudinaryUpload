const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

exports.uploadImage = (request, response) => {
    // collected image from a user
    const userImage = {
        image: request.body.image,
    };
    // upload image 
    cloudinary.uploader.upload(userImage.image)
        .then((res) => {
            response.status(200).send({
                message: 'image uploaded to cloudinary successfully',
                res,
            });
        }).catch((error) => {
            response.status(500).send({
                message: 'failed in image upload to cloudinary',
                error,
            });
        });
};