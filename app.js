const express = require('express');
const app = express();
const morgan= require('morgan');
const mongoose= require('mongoose');
const Blog= require('./models/blog');
const { result } = require('lodash');
const { render } = require('ejs');
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

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
  });

//blog routes
app.get('/blogs',((req,res)=>{
    Blog.find().sort({createdAt:-1}).then((result) =>{
        res.render('index',{title: 'all Blogs',blogs:result});
    }).catch((err)=>console.log(err));
}));

app.post('/blogs',(req,res)=>{
    const blog = new Blog(req.body);
    blog.save().then((result)=>{
    res.redirect('/blogs');
    }).catch((err)=>console.log(err));
});

app.get('/blogs/:id',(req,res)=>{
    const id = req.params.id;
    Blog.findById(id).then(result=>{
        res.render('details',{blog:result,title:'Blog Details'});
    }).catch(err=>console.log(err));

});


app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/blogs' });
      })
      .catch(err => {
        console.log(err);
      });
  });
    

app.use((req,res)=>{
    res.status(404).render('404',{title:"404"});
});



