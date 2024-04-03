const express = require('express');
const app = express();

app.use((request, response) => {
    response.json({ message: 'server response!' }); 
 });


module.exports = app;