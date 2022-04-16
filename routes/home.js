const express = require('express');
const router = express.Router();
const linksForHome = 
[ {url: 'https://www.cancer.ie/' , text : 'Make donation against cancer here'},
  {url: 'https://www.youtube.com/channel/UCFAiFyGs6oDiF1Nf-rRJpZA' , text : 'Technoblade'}];


router.get('/', function (req, res) {
    var message = "";
     
    if (req.signedCookies.tracking){
        var dateLastVisit = req.signedCookies.tracking;
        var message = "Welcome back, you last visited on : " + dateLastVisit + "\n \n";
    }

    var currentDate = new Date();
    res.cookie('tracking',currentDate.toDateString(), {signed : true});
    res.render('home', {'message': message, links : linksForHome});
});

router.get('/about',  (req, res) => {
    res.render('about');
});

router.get('/contact',  (req, res) => {
    res.render('contact');
});

router.get('/technoblade', (req, res) => {
    res.render('technoblade');
});

router.get('/discussion', (req, res) => {
    res.render('discussion');
});

module.exports = router;