const express =require('express');
var router = express.Router();
const mongoose  =require('mongoose');
const Employee = mongoose.model('Employee')


router.get('/',  async (req,res) =>{
    const employees = await Employee.find();
    res.status(200).json({employees});
 });
 
 router.post('/', (req, res) => insertEmployee(req, res));
 
 router.put('/edit/:employeeId', (req, res) => updateEmployee(req, res));
 
 router.delete('/delete/:employeeId', (req, res) => deleteEmployee(req, res));
 

 function insertEmployee(req, res){
    var employee = new Employee();
    employee.firstName = req.body.firstName
    employee.lastName = req.body.lastName
    employee.staffEmail = req.body.staffEmail
    employee.dob = req.body.dob
    employee.gender = req.body.gender
    employee.address = req.body.address
    employee.phoneNumber = req.body.phoneNumber
    employee.profilePicture = req.file.filename;
    


    employee.save((err, doc) => {
        if (!err)
            res.status(200).json('Done');
            else{
                console.log('Unable to save employee : ' + err);
                
            }
    });
}

const updateEmployee = async (req, res) => {
    const employeeId = req.params.employeeId;
    var employee = await Employee.findById(employeeId);
    employee.firstName = req.body.firstName
    employee.lastName = req.body.lastName
    employee.staffEmail = req.body.staffEmail
    employee.dob = req.body.dob
    employee.gender = req.body.gender
    employee.address = req.body.address
    employee.phoneNumber = req.body.phoneNumber
    employee.profilePicture = req.file.filename;
    


    employee.save((err, doc) => {
        if (!err)
            res.status(200).json('Done');
            else{
                console.log('Unable to save employee : ' + err);
                
            }
    });
}

const deleteEmployee = async (req, res) => {
    const employeeId = req.params.employeeId;
    await Employee.findByIdAndRemove(employeeId, { useFindAndModify: false });
    res.status(200).json('Done');
};


module.exports = router;