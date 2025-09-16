const express = require('express');
const app = express();

app.set('view engine','ejs')

app.use(express.urlencoded({extended:true}))
app.use(express.json())

const morgan = require('morgan');
app.use(morgan('dev'));


const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db');
connectDB();

const routes = require('./routes/user.routes')

app.use('/',routes);




app.listen(3000);
console.log('server is running on port 3000');