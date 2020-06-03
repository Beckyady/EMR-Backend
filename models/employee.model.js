const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
 
firstName: {
    type: String
},
lastName: {
    type: String
},
staffEmail: {
    type: String
},
dob: {
    type: Date
},
gender: {
    type: String,
    required : [
        'Male',
        'Female'
    ],
},
address: {
    type: String
},
phoneNumber: {
    type: Number
},
password: {
    type: String
},
confirmPassword: {
    type: String
},
profilePicture:{
    type: String
}
});

mongoose.model('Employee', employeeSchema);