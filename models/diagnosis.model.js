const mongoose = require('mongoose');

var diagnosisSchema = new mongoose.Schema({
    symptoms: {
        type: String
    },
    diagnosis: {
        type: String
    },
    prescription: {
        type: String
    },
    diagnosisDate: {
        type: Date
    }
});
mongoose.model('Diagnosis', diagnosisSchema);