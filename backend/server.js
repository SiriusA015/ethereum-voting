const express       = require('express');
const cors          = require('cors');
const mongoose      = require('mongoose');

const userRoute     = require('./routes/user');
const exerciseRoute = require('./routes/exercises');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = 'mongodb://localhost:27017/react2';
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connected Successfully");
});

app.use('/user', userRoute);
app.use('/exercise', exerciseRoute);

app.listen(port, () => {
    console.log(`Server running at ${port}`);
})