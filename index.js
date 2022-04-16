const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const home = require('./routes/home');
const staff = require('./routes/staff');
const cookieParser = require('cookie-parser');
session = require('express-session');
const getNewsData = () => [
    {
        heading: 'New features !',
        body: "It was bad, now it is still bad but better than before, the website now have a new banner and is better designed. Just a bit. And now you can post things, amazing.",
        Auther: 'Hector Colin'
    },
    {
      heading: 'The website is finished',
      body: "Actually no. But there is everything that is required and that my lazyness can provide without dying. This is a big news right ?",
      Auther: 'Hector Colin'
    },
    {
        heading: 'Contest miss Kitty',
        body: "Miss Kitty Ukraine has been elected as Miss Universal Kitty. Her cuteness will bring end to war in a pur.",
        Auther: 'Hector Colin'
    },
    {
        heading: 'The crow',
        body: "Have you seen my crow ? Just in a word, he disapeared, I don't know where he flew. He must be hiding somewhere.",
        Auther: 'Hector Colin'
    }
]
const newsMiddleware = (req, res, next) => {
    if(!res.locals.partials) res.locals.partials = {}
    res.locals.partials.newsContext = getNewsData()
    next()
}


app.use(express.urlencoded({ extended: true })) 
app.use(newsMiddleware)
app.use(express.static('public'));
app.use(cookieParser('Hector le fort'));
app.use(session(
    {secret: "secret", 
    cookie: { maxage: 6000},
    resave: false,
    saveUninitialized: false
  }));

// set up handlebars view engine
var handlebars = require('express-handlebars')
.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

mongoose.connect('mongodb://localhost:27017/SS2022', {
    "useNewUrlParser": true,
    "useUnifiedTopology": true
}).
catch ( error => {
    console.log('Database connection refused' + error);
    process.exit(2);
})
  
const db = mongoose.connection;
  
db.on('error', console.error.bind(console, 'connection error:'));
  
db.once('open', () => {
    console.log("DB connected")
});
  
const {flashMiddleware} = require('./lib/middleware.js');
app.use(flashMiddleware);

app.use('/', home);
app.use('/staff', staff);


// // 404 catch-all handler (middleware)
app.use(function (req, res, next) {
    res.status(404);
    res.render('404');
});
// // 500 error handler (middleware)
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
