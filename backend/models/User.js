const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: { type: String, unique: true },
    role: {
        type: String,
        enum: ['admin', 'employee'],
        default: 'employee',
    }
});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const User = mongoose.model('User', userSchema);
module.exports = User;