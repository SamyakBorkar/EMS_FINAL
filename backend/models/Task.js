const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title: {type: String, required: true},
    description : String,
    assignedTo : { type: mongoose.Schema.Types.ObjectId, ref :'User'},
    assignedBy : {type: mongoose.Schema.Types.ObjectId, ref:'Employees' },
    deadline : { type: Date },
    status : {type : String , default: 'Pending'},
},{timestamps: true});

module.exports = mongoose.model('Task', taskSchema);