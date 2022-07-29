const express = require('express');
const app = express();
const config = require('./config/envConfig');
const cors = require('./config/corsConfig');
const { connectToDatabase } = require('./config/dbConnection');
const { baseRouter, userRouter, doctorRouter, adminRouter, appointmentRouter } = require('./router/main.router');
const morganMiddleware = require('./middleware/logging.middleware');
const logger = require('./config/logger');
const { cloudinaryConfig } = require('./config/cloudinaryConfig');



/* ---------- Mount the morgan logging middleware ---------- */
app.use(morganMiddleware);


/* ---------- Mount the CORS configuration middleware ---------- */
app.use(cors());


/* ---------- Mount the parsing middleware ---------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/* ---------- Mount the Cloudinary configuration middleware ---------- */
app.use('*', (req, res, next) => { cloudinaryConfig(); next(); });


/* ---------- Mount the routers middleware ---------- */
app.use('/api', baseRouter);
app.use('/api/users', userRouter);
app.use('/api/doctors', doctorRouter);
app.use('/api/admin', adminRouter);
app.use('/api/appointments', appointmentRouter)


/* ---------- Mount the error handling middleware ---------- */
app.use((req, res, next) => {
    res.status(404).json({ message: '404 Not Found' });
});
app.use((error, req, res, next) => {
    logger.error(`${req.ip} ${req.method} ${req.path} ${error.statusCode} - ${error.toString()}`);
    res.status(error.statusCode).json({ error: error.toString() });
})



/* ---------- Establish the server & database connections ---------- */
connectToDatabase(config.DB.URL);
app.listen(config.APP.PORT, () => console.log(`Server is listening on http://localhost:${config.APP.PORT}`));