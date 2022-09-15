const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const morgan = require("morgan");

const keys = require("./config/keys");

//import routes
const userV1Routes = require("./routes/v1/user/api");

const app = express();
dotenv.config();

//connect to database
mongoose.connect(keys.DATABASE_URL).then(result => {
    const dbName = result.connection.db.databaseName;
    console.log(`Connected to Database ${dbName}`);
}).catch(reason => {
    console.log(`Database Error: ${reason.message}`);
});


//prevents xss attack
app.use(helmet({xssFilter: true}));

//enable cors
app.use(cors({'Access-Control-Allow-Origin': "*"}));

//populate req.body with body data
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(userV1Routes);

module.exports = app;
