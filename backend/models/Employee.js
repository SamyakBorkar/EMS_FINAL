const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    name:String,
    email:{type:String, unique:true},
    department:String,
    contact:String,
    role: {
        type: String,
        enum: ['admin', 'employee'],
        default: 'employee',
    },
    createdBy:{type:mongoose.Schema.Types.ObjectId, ref:'User'}
}, 
{
  timestamps: true, //
});

const Employees=mongoose.model('Employees', employeeSchema);
module.exports=Employees;