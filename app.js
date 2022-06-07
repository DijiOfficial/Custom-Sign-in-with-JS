const express = require('express');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
const expressEjsLayout = require('express-ejs-layouts')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
require("./config/passport")(passport);

// mongoose
const dbPassword = "0TeEaRuCdH5yqRpJ";
const dbURI = `mongodb+srv://MangoDBTester:${dbPassword}@cluster0.w3p76.mongodb.net/Cluster0?retryWrites=true&w=majority`
mongoose.connect(dbURI, {
    useNewUrlParser: true, useUnifiedTopology : true,
})
    .then(() => console.log('connected to DB'))
    .catch((err)=> console.log(err));

// EJS
app.set('view engine','ejs');
app.use(expressEjsLayout);

// BodyParser
app.use(express.urlencoded({extended : false}));
// express session
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}));
app.use(passport.initialize());
app.use(passport.session());
//use flash
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error  = req.flash('error');
    next();
})

// Routes
app.use('/',require('./index'));
app.use('/users',require('./users'))

app.listen(3000, () => console.log("Server Up and running"));