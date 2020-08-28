const express = require('express');
const app = express();
const morgan= require('morgan');
app.set('view engine','ejs');
const dbURI='mongodb+srv://Abrahem:testman1@blogapp.n8jtk.mongodb.net/<dbname>?retryWrites=true&w=majority'

app.listen(3000);
app.use(morgan('dev'));

//middleware & static files
app.use(express.static('public'));


app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      ];
    res.render('index',{title:"Home",blogs});
});

app.get('/about', (req, res) => {
    res.render('about',{title:"about"});
});

app.get('/blogs/create', (req, res) => {
    res.render('create',{title:"Create new blog"});

});

app.use((req,res)=>{
    res.status(404).render('404',{title:"404"});
});



