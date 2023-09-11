
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const routes= require('./routes/routes');
const serviceAccount=require("./firebase/service-account-firebase.json")
const admin = require("firebase-admin");
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: "https://aadharcardscanner-72071.firebaseio.com",
});


const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(cors({
  origin: '*'
}));
// app.options('*', cors());
app.use(express.static('./public'));




app.use('/api/v1/trading',routes);



app.all('*', (req, res, next) => {
    const err = new AppError(`Can't find ${req.originalUrl} on this server`, 404);
    next(err);
  });
  
  app.use(globalErrorHandler);


module.exports = app;