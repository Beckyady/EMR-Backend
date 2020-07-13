const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/HospitalDB', { useNewUrlParser: true}, (err) => {
     if (!err) {
         console.log('Database connected successfully');
     }else{
        console.log('Database error connection');

     }
});

require('./patient.model');
require('./employee.model');
require('./appointment.model');
require('./diagnosis.model');