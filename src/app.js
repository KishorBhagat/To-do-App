const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const {requireAuth} = require('../middleware/authMiddleware');


app.use('/static', express.static(path.join(__dirname, "../public")));
app.use('/css', express.static(path.join(__dirname, "../public/css")));
app.use('/js', express.static(path.join(__dirname, "../public/js")));

app.set('views', path.join(__dirname, '../views'));
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, '../partials'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render("signup");
});

app.get('/login', (req, res) => {
    res.render("login");
});

app.get('/todo', (req, res) => {
    res.render('todo');
});

app.get('/confirmreset', (req, res) => {
    res.render('confirmReset');
});

app.get('/code', (req, res) => {
    res.render('otp');
});

app.get('/resetPassword', (req, res) => {
    res.render('resetPassword');
});

app.listen(port, ()=>{
    console.log("Server listening at port "+ port);
});