 require('./models/db');
const path = require('path');
 const express =require('express');
 const jwt = require('jsonwebtoken');
const multer = require('multer');
 const patientController = require('./controllers/patientController');
 const employeeController = require('./controllers/employeeController');
 const appointmentController = require('./controllers/appointmentController');
 const loginController = require('./controllers/loginController');
 const diagnosisController = require('./controllers/diagnosisController');



 var app = express();

 const storage = multer.diskStorage({
    destination: 'images',
    filename: (req, file, cb) => {
      cb(null, `${new Date().getTime().toString()}-${file.originalname}`);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg'
      || file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };


 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(multer({storage, fileFilter}).single('profilePicture'));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    );
    next();
  });

 app.listen(3000, () =>{
     console.log('Server started at port : 3000');
     
 }); 

 app.use('/patient',patientController);
 app.use('/employee', employeeController);
 app.use('/appointment',appointmentController);
 app.use('/api/login',loginController);
 app.use('/diagnosis',diagnosisController);
 