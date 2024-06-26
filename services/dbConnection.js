const pg = require('pg');

const config = {
    user: 'postgres',
    database: 'cloudinaryDB',
    password: 'maori753951',
    port: 5432,
    max: 5, // max number of clients in the pool
    idleTimeoutMillis: 30000,
};

const pool = new pg.Pool(config);

pool.on('connect', () => {
    console.log('connected to the Database');
});

const createTables = () => {
    const imageTable = `CREATE TABLE IF NOT EXISTS images(
      id SERIAL PRIMARY KEY,
      title VARCHAR(128) NOT NULL,
      cloudinary_id VARCHAR(128) NOT NULL,
      image_url VARCHAR(128) NOT NULL
    )`;
    pool
        .query(imageTable)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((error) => {
            console.log(error);
            pool.end();
        });
};

pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});

//export pool and createTables to be accessible from anywhere within the application
module.exports = {
    createTables,
    pool,
};

require('make-runnable');
