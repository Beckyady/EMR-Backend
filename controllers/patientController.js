const express =require('express');
var router = express.Router();
const mongoose  =require('mongoose');
const Patient = mongoose.model('Patient')


router.get('/',  async (req,res) =>{
   const patients = await Patient.find();
   res.status(200).json({patients});
});


router.get('/patientInfo', async (req, res) => {
    const patient = await Patient.find().select('firstName').select('lastName').select('matricNo');
    res.status(200).json({patient});
});



router.post('/', (req, res) => insertPatient(req, res));

router.put('/edit/:patientId', (req, res) => updatePatient(req, res));

router.delete('/delete/:patientId', (req, res) => deletePatient(req, res));

function insertPatient(req, res){
    var patient = new Patient();
    patient.cardNumber = req.body.cardNumber;
    patient.matricNo = req.body.matricNo;
    patient.firstName = req.body.firstName
    patient.lastName = req.body.lastName
    patient.category = req.body.category
    patient.otherName = req.body.otherName
    patient.email = req.body.email
    patient.dob = req.body.dob
    patient.gender = req.body.gender
    patient.address = req.body.address
    patient.phoneNumber = req.body.phoneNumber
    patient.bloodGroup = req.body.bloodGroup
    patient.genoType = req.body.genoType
    patient.nextOfKinName = req.body.nextOfKinName
    patient.nextOfKinEmail = req.body.nextOfKinEmail
    patient.profilePicture = req.file.filename;


    patient.save((err, doc) => {
        if (!err)
            res.status(200).json('Done');
            else{
                console.log('Unable to save patient : ' + err);
                
            }
    });
}

const updatePatient = async (req, res) => {
    const patientId = req.params.patientId;
    var patient = await Patient.findById(patientId);
    patient.cardNumber = req.body.cardNumber;
    patient.matricNo = req.body.matricNo;
    patient.firstName = req.body.firstName
    patient.lastName = req.body.lastName
    patient.category = req.body.category;
    patient.otherName = req.body.otherName
    patient.email = req.body.email
    patient.dob = req.body.dob;
    patient.gender = req.body.gender
    patient.address = req.body.address
    patient.phoneNumber = req.body.phoneNumber
    patient.bloodGroup = req.body.bloodGroup;
    patient.genoType = req.body.genoType;
    patient.nextOfKinName = req.body.nextOfKinName
    patient.nextOfKinEmail = req.body.nextOfKinEmail
    patient.profilePicture = req.file.filename;
    


    patient.save((err, doc) => {
        if (!err)
            res.status(200).json('Done');
            else{
                console.log('Unable to save patient : ' + err);
                
            }
    });
}

const deletePatient = async (req, res) => {
    const patientId = req.params.patientId;
    await Patient.findByIdAndRemove(patientId, { useFindAndModify: false });
    res.status(200).json('Done');
};

router.get('/list',(req,res) =>{
res.json('from list')
})

module.exports = router;