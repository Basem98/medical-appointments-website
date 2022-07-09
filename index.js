const express = require('express');
const app = express();
const config = require('./config/envConfig');
const { connectToDatabase } = require('./config/dbConnection');
const { userRouter, doctorRouter, adminRouter } = require('./router/main.router');


/* ---------- Mount the parsing middleware ---------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));





/* ---------- Mount the routers middleware ---------- */
app.use('/api/users', userRouter);
app.use('/api/doctors', doctorRouter);
app.use('/api/admin', adminRouter);


/* ---------- Establish the server & database connections ---------- */
connectToDatabase(config.DB.URL);
app.listen(config.APP.PORT, () => console.log(`Server is listening on http://localhost:${config.APP.PORT}`));