const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
dotenv.config({path: './config/config.env'});
const app = express();
app.use(bodyParser.json());
//routes
const bootcamps = require('./routes/bootcamps');


connectDB();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
//Mount routers
app.use('/api/v1/bootcamps', bootcamps);



const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    server.close(() => process.exit(1));
});

