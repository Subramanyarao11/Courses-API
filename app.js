
require("dotenv").config({ path: ".env" });
const express = require('express');
const mongoose = require('mongoose');
const url = process.env.MONGODB_URI;
const getCourses = require('./routes/course');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000

//Conneting To DB
async function main() {
    await mongoose.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    });
    // console.log('Connected to DB');
}
main().catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Lets build an API!');
});

// Using bodyParser  by default to all the routes as middleware to parse the body of the request
app.use(express.json());

// Using Cors Middleware to allow cross origin requests
app.use(cors())

// Using the routes
app.use('/courses', getCourses);

app.listen(port, () => {
    console.log('Example app listening on port 3000!');
});
