const express = require('express');
const router = express.Router();
const { readStaff  } = require('../models/staff');

router.get('/', async (req,res) =>{
    const staff = await readStaff();

    if (req.session.staffdata) {
        var newName = req.session.staffdata.name;
    }
    else {
        var newName = "";
    }

    res.render('listing', { listing: staff, newName : newName }
)});

router.get('/account', (req, res) =>
{
    var fname = req.query.firstname;
    var sname = req.query.surname;
    console.log('Date entered ' + fname + ' ' + sname)
    res.render('personform')
}
)

router.post('/account', async (req, res) => {
    await createStaff(req.body);
  
    req.session.staffdata = { name: req.body.name};
      req.session.flash = 
      { type: 'success', intro: 'Data Saved:', message:  "Data for <strong>" + req.body.name + "</strong> has been added"}
      res.redirect(303, '/staff')
})  

router.get('/personadded', (req, res) => res.render('personadded'))

router.get('/:name', async (req, res) => {
    var name = req.params.name;

    const person = await readStaff({'name': name})

    if (!person) 
    {
        console.log('404 because person doesn\'t exist');
        res.render('404');
    }
    else 
    {
        res.render('person', { person: person });
    }
});

// no error checking for now.
//
router.get('/:name/delete', async (req, res) => {
    var name = req.params.name;

    await deleteStaff(name);

    res.redirect(303, '/staff');

});

router.get('/:name/edit', async (req, res) => {

    var name = req.params.name;

    const person = await readStaff({'name': name})

    if (!person) {
        console.log('404 because person doesn\'t exist');
        res.render('404');
    }
    else {
        res.render('personeditform', { person: person });
    }
});

router.post('/:name/edit', async (req,res) =>{

    await updateStaff(req.body);
    
    res.redirect(303, '/staff')

});

module.exports = router;