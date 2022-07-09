const express = require('express');
const app = express();
const config = require('./config/envConfig');


app.listen(config.APP.PORT, () => console.log(`Server is listening on http://localhost:${config.APP.PORT}`));