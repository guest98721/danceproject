const express=require("express");
const path = require("path");
const app =express();
const mongoose = require('mongoose');
const bodyparser=require("body-parser");
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
const port =8000;

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const Contact = mongoose.model('Contact', contactSchema);

// express specific stuff 
app.use('/static',express.static('static'));
app.use(express.urlencoded());

// pug specific Stuff 
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

// end points 
app.get('/',(req,res)=>{
    const params={ }
    res.status(200).render('home.pug',params);
})
app.get('/contact',(req,res)=>{
    const params={ }
    res.status(200).render('contact.pug',params);
})
app.post('/contact',(req,res)=>{
    var mydata= new Contact(req.body);
    mydata.save().then(()=>{
        res.send("this item has been saved to data base")
    }).catch(()=>{
    res.status(400).send("item wasn't saved to data base") });

    // res.status(400).render('contact.pug');
})

// start the server 
app.listen(port, ()=>{
        console.log(`the application started successfully on port ${port}`)
})