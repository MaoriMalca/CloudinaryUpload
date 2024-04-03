const cloudinary = require('cloudinary').v2;
const db = require('../../services/dbConnection');
require('dotenv').config();

// cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

exports.persistImage = (request, response) => {
    // collected image from a user
    const userImage = {
        title: request.body.title,
        image: request.body.image
    }

    // upload image here
    cloudinary.uploader.upload(userImage.image)
        .then((res) => {
            db.pool.connect((err, client) => {
                // inset query to run if the upload to cloudinary is successful
                const insertQuery = `INSERT INTO images (title, cloudinary_id, image_url) VALUES($1,$2,$3) RETURNING *`;
                const values = [userImage.title, res.public_id, res.secure_url];

                // execute query
                client.query(insertQuery, values)
                    .then((res) => {
                        res = res.rows[0];

                        // send success response
                        response.status(201).send({
                            status: 'ok',
                            data: {
                                message: 'image uploaded to cloudinary successfully',
                                title: res.title,
                                cloudinary_id: res.cloudinary_id,
                                image_url: res.image_url,
                            },
                        })
                    }).catch((error) => {
                        response.status(500).send({
                            message: 'failed in query execute',
                            error,
                        });
                    })
            })
        }).catch((error) => {
            response.status(500).send({
                message: 'failed in image upload to cloudinary',
                error,
            });
        });
};

