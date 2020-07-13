const express =require('express');
var router = express.Router();
const mongoose  =require('mongoose');
const Diagnosis = mongoose.model('Diagnosis')

const isAuth = require('../middleware/is-auth').isAuth;


router.get('/',  async (req,res) =>{
    const diagnose = await Diagnosis.find();
    res.status(200).json({diagnose});
 });

 router.post('/', isAuth, (req, res) => insertDiagnosis(req, res));
 
 router.put('/edit/:diagnosisId', isAuth, (req, res) => updateDiagnosis(req, res));
 
 router.delete('/delete/:diagnosisId', isAuth, (req, res) => deleteDiagnosis(req, res));


 function insertDiagnosis(req, res){
    var diagnosis = new Diagnosis();

    diagnosis.symptoms = req.body.symptoms;
    diagnosis.diagnosis = req.body.diagnosis;
    diagnosis.prescription = req.body.prescription
    diagnosis.diagnosisDate = req.body.diagnosisDate
    
    diagnosis.save((err, doc) => {
        if (!err)
            res.status(200).json('Done');
            else{
                console.log('Unable to save diagnosis : ' + err);
                
            }
    });
}

const updateDiagnosis = async (req, res) => {
    const diagnosisId = req.params.diagnosisId;
    var diagnosis = await Diagnosis.findById(diagnosisId);
    diagnosis.symptoms = req.body.symptoms;
    diagnosis.diagnosis = req.body.diagnosis;
    diagnosis.prescription = req.body.prescription
    diagnosis.diagnosisDate = req.body.diagnosisDate
    


    diagnosis.save((err, doc) => {
        if (!err)
            res.status(200).json('Done');
            else{
                console.log('Unable to save diagnosis : ' + err);
                
            }
    });
}

const deleteDiagnosis = async (req, res) => {
    const diagnosisId = req.params.diagnosisId;
    await Diagnosis.findByIdAndRemove(diagnosisId, { useFindAndModify: false });
    res.status(200).json('Done');
};

router.get('/list',(req,res) =>{
res.json('from list')
})

module.exports = router;
