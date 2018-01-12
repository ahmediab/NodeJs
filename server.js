const express = require('express');
const hbs = require('hbs');
var app = express();
const fs = require('fs');

app.set('view engine', 'hbs');
app.use(express.static(__dirname+'/public'));
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper("getCurrentYear" ,()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();

});
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err)
        {
            console.log('unable to append to server.log');
        }
    });
    next();
    
})
app.use((req,res,next)=>{
    res.render('/main.hbs');


});

app.get('/',(req,res)=>{
    // res.send(' <h1>hello Express</h1> ');
    res.render('home.hbs',{
        pageTitle : 'Homepage' ,
        body : 'This is Home website',
        currentYear : new Date().getFullYear()
      
    });
  
});
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About page',
        currentYear : new Date().getFullYear()
    });

});
app.get('/bad',(req,res)=>{
    res.send({
        name : 'error'
    });
});

app.listen(3000 ,()=>{
    console.log('Server is up with 3000');
});