const express =require('express');
var router = express.Router();
const mongoose  =require('mongoose');
const Appointment = mongoose.model('Appointment');
const Patient = mongoose.model('Patient');

const isAuth = require('../middleware/is-auth').isAuth;


router.get('/',  async (req,res) =>{
    const appointments = await Appointment.find();
    res.status(200).json({appointments});
 });
 
 router.post('/',  (req, res) => insertAppointment(req, res));
 
 router.put('/edit/:appointmentId', isAuth, (req, res) => updateAppointment(req, res));
 
 router.delete('/delete/:appointmentId', isAuth, (req, res) => deleteAppointment(req, res));
 
 const insertAppointment = async (req, res) => {
     
    var appointment = new Appointment();
    appointment.appointmentId = req.body.appointmentId
    appointment.doctorName = req.body.doctorName
    console.log(req.body.matricNo)
    const patient = await Patient.findOne({ matricNo: req.body.matricNo });
    
    if (!patient) return;
    appointment.patient = patient._id;
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
    appointment.matricNo = req.body.matricNo 
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