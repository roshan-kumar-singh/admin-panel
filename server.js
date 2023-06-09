require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const adminRoute = require('./routes/admin.routes');


mongoose.connect(process.env.MONGO_URI).then(
    ()=>console.log('db is connected..')
  ).catch(err=>console.log(err))
  


//middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));



app.use("/api/admin",adminRoute)


//server
  const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
});