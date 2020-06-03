const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var appointmentSchema = new mongoose.Schema({
 
appointmentId: {
    type: String
},
patient: {
    type: Schema.Types.ObjectId,
    ref: 'Patient'
},
doctorName: {
    type: String
},
appointmentDate: {
    type: Date
}

});

mongoose.model('Appointment', appointmentSchema);