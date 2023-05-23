const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');

const env = require('dotenv').config();
const appRoutes = require('./routes/appRoute');

const app = express();


const dbURI = process.env.DB_URI;
mongoose.connect(dbURI)
    .then((result) => app.listen(3001, () => {
        console.log('server has been started');
    }))
    .catch((err) => console.log(err))
    ;

app.set('view engine', 'ejs');

//middleware && static
app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));

app.use(appRoutes);
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})

