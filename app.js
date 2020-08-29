const express = require('express');
const app = express();
const morgan= require('morgan');
const mongoose= require('mongoose');
const { result } = require('lodash');
const { render } = require('ejs');
const blogRouter = require('./routes/blogRoutes');
app.set('view engine','ejs');



const dbURI='mongodb+srv://Abrahem:testman1@blogapp.n8jtk.mongodb.net/BlogApp?retryWrites=true&w=majority'
mongoose.connect(dbURI,{ useNewUrlParser:true , useUnifiedTopology:true})
.then((result)=>{
    console.log('connected to database');
    app.listen(3000);
}).catch((err)=>console.log(err));

app.use(morgan('dev'));

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.redirect('/blogs');
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
app.use('/blogs',blogRouter);

app.use((req,res)=>{
    res.status(404).render('404',{title:"404"});
});



