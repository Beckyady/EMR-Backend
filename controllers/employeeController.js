const express =require('express');
var router = express.Router();
const mongoose  =require('mongoose');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const Employee = mongoose.model('Employee')

const isAuth = require('../middleware/is-auth').isAuth;


router.get('/',  async (req,res) =>{
    const employees = await Employee.find();
    res.status(200).json({employees});
 });
 
 router.post(
     '/', 
     [
         body('staffEmail').isEmail().withMessage('Invalid Email').custom(async email => {
             const user = await Employee.findOne({staffEmail: email});
             if (user) return Promise.reject('E-mail already exists!');
         }).normalizeEmail()
     ],
     isAuth,
     (req, res) => insertEmployee(req, res)
     );
 
 router.put('/edit/:employeeId', isAuth, (req, res) => updateEmployee(req, res));
 
 router.delete('/delete/:employeeId', isAuth, (req, res) => deleteEmployee(req, res));
 

 async function insertEmployee(req, res){
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         const errorData = errors.array();
         res.status(403).json({ message: errorData[0].msg });
         return;
     }
    var employee = new Employee();
    employee.firstName = req.body.firstName
    employee.lastName = req.body.lastName
    employee.staffEmail = req.body.staffEmail
    employee.dob = req.body.dob
    employee.gender = req.body.gender
    employee.address = req.body.address
    employee.phoneNumber = req.body.phoneNumber
    employee.profilePicture = req.file ? req.file.filename : '';
    employee.password = await bcrypt.hash(req.body.password, 10);
    
    if (req.body.password === req.body.confirmPassword) {
    employee.save((err, doc) => {
        if (!err)
            res.status(200).json('Done');
            else{
                console.log('Unable to save employee : ' + err);
                
            }
    });
    } else { res.status(422).json('Passwords do not match'); }
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