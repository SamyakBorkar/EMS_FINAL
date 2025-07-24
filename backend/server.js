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
app.use(cors({
  origin: ["https://smarthr-zeta.vercel.app/"], 
  credentials: true,
}));

app.use(express.json())
app.use('/', authRoutes)
app.use('/', employeeRoutes);
app.use('/', taskRoutes)
app.get('/', (req,res)=>{
    res.cookie('name','samyak')
    res.send("API running")
})

const PORT  = process.env.PORT || 5000;
app.listen(PORT, (req, res)=>{
    console.log(`server running on PORT : ${PORT}`)
})


