"use strict";

const cors = require('cors')
require('dotenv').config();
require('express-async-errors') 
const express = require('express');
const validateToken = require('./src/middlewares/validateTokenhandler');
const app = express();

 
//* -----------| -Swagger- |-----------

// import swagger ui module and swagger json file
const swJsonDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./swagger/swagger.json");

const options = require('./swagger/options.json');
const swaggerSpecs = swJsonDoc(options);

// add route for swagger document API
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));


//* -----------| -middlewares- |-----------
app.use(express.json())
app.use(cors());

//* -----------| -DB Connection- |-----------
require('./src/config/db')()

//* -----------| -- |-----------
app.all("/",(req,res)=>res.send("Welcome to the Blog Api! You are here with : "+  req.method + " method"))

//* -----------| -Routes- |-----------
app.use('/categories',require('./src/routers/blogCategoryRouter'))
app.use('/blogs',require('./src/routers/blogPostRouter'))
app.use('/auth',require('./src/routers/authRouter'))


//* -----------| -routes- |-----------




//* -----------| -- |-----------
//* -----------| -- |-----------






//* -----------| -error handler- |-----------
app.use(require('./src/middlewares/errorHandler'));



//* -----------| -listen port- |-----------
const PORT = process.env.PORT;
app.listen(PORT,()=>console.log('Server is running on : ' + PORT));
