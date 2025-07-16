const express = require('express')
const app = express();
const db = require('./config/db.js')
const dotenv = require('dotenv')
const authRoutes = require('./routes/authRoutes.js')
const employeeRoutes = require('./routes/employeeRoutes.js')
const taskRoutes = require('./routes/taskRoutes.js')
const cors = require('cors')

dotenv.config()
db();
app.use(cors());
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/employees', employeeRoutes);
app.use('/api/tasks', taskRoutes)
app.get('/', (req,res)=>{
    res.cookie('name','samyak')
    res.send("API running")
})

const PORT  = process.env.PORT || 5000;
app.listen(PORT, (req, res)=>{
    console.log(`server running on PORT : ${PORT}`)
})


