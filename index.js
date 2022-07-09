const express = require('express');
const app = express();
const config = require('./config/envConfig');
const { connectToDatabase } = require('./config/dbConnection');

/* ---------- Mount the parsing middleware ---------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectToDatabase(config.DB.URL);
app.listen(config.APP.PORT, () => console.log(`Server is listening on http://localhost:${config.APP.PORT}`));