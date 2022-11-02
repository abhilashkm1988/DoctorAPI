const express = require("express")  
const bodyParser = require('body-parser')
const cors = require("cors")
const dotenv = require("dotenv") 
var multer = require('multer') 

const app = express()

dotenv.config()

global.uploadPath=__dirname+'\\uploads\\doctors\\';

require("./config/dbcon")

const api = process.env.API_URL 
const port = process.env.PORT || 3000

const corsOptions = {  origin: `http://localhost:${port}`  }

//Routes
const userRoute = require('./routes/users') 
const doctorsRoute = require('./routes/doctor') 
const bookingRoute = require('./routes/booking') 
  
app.use(cors(corsOptions))
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(`${api}users`,userRoute)
app.use(`${api}doctors`,doctorsRoute)
app.use(`${api}bookings`,bookingRoute)


app.get("/", (req, res) => {
    res.json({ message: "Doctors Booking API V1" })
})

app.use((err,req,res, next) => {
    const errStatus = err.status || 500
    const errorMessage = err.message || 'Something went wrong'
    return res.status(errStatus).json({
        success:false,
        status:errStatus,
        message:errorMessage
        //stack:err.stack
    })
})

app.listen(port,()=>
    console.log(`Server up and running on port : http://localhost:${port}`)
)
