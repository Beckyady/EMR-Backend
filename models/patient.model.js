const mongoose = require('mongoose');

var patientSchema = new mongoose.Schema({
    cardNumber: {
        type: Number
    },
    matricNo: {
        type: String
    },
    category: {
        type: String,
        required : [
            'Student',
            'Staff'
        ],
    },
firstName: {
    type: String
},
lastName: {
    type: String
},
otherName: {
    type: String
},
email: {
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
bloodGroup: {
    type: String,
    required : [
        'A positive (A+)',
        'A negative (A-)',
        'B positive (B+)',
        'B negative (B-)',
        'O positive (O+)',
        'O negative (O-)',
        'AB positive (AB+)',
        'AB negative (AB-)'
    ],
    
},
genoType: {
    type: String,
    required : [
        'AA',
        'AS',
        'SS'
       
    ],
    
},
nextOfKinName: {
    type: String
},
nextOfKinEmail: {
    type: String
},
profilePicture:{
    type: String
}
});

mongoose.model('Patient', patientSchema);