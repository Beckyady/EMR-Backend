const express =require('express');
var router = express.Router();
const mongoose  =require('mongoose');
const Appointment = mongoose.model('Appointment')


router.get('/',  async (req,res) =>{
    const appointments = await Appointment.find();
    res.status(200).json({appointments});
 });
 
 router.post('/', (req, res) => insertAppointment(req, res));
 
 router.put('/edit/:appointmentId', (req, res) => updateAppointment(req, res));
 
 router.delete('/delete/:appointmentId', (req, res) => deleteAppointment(req, res));
 

 function insertAppointment(req, res){
    var appointment = new Appointment();
    appointment.appointmentId = req.body.appointmentId
    appointment.patient = req.body.patient
    appointment.doctorName = req.body.doctorName
    appointment.appointmentDate = req.body.appointmentDate
    
    appointment.save((err, doc) => {
        if (!err)
            res.status(200).json('Done');
            else{
                console.log('Unable to save appointment : ' + err);
                
            }
    });
}

const updateAppointment = async (req, res) => {
    const appointmentId = req.params.appointmentId;
    var appointment = await Appointment.findById(appointmentId);
    appointment.appointmentId = req.body.appointmentId
    appointment.patient = req.body.patient
    appointment.doctorName = req.body.doctorName
    appointment.appointmentDate = req.body.appointmentDate
    


    appointment.save((err, doc) => {
        if (!err)
            res.status(200).json('Done');
            else{
                console.log('Unable to save appointment : ' + err);
                
            }
    });
}

const deleteAppointment = async (req, res) => {
    const appointmentId = req.params.appointmentId;
    await Appointment.findByIdAndRemove(appointmentId, { useFindAndModify: false });
    res.status(200).json('Done');
};


module.exports = router;