const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const post = require('./models/post');
const Post = require('./models/post');
const env = require('dotenv').config();

const app = express();


const dbURI = process.env.DB_URI;
mongoose.connect(dbURI)
    .then((result) => app.listen(3001, () => {
        console.log('server has been started');
    }))
    .catch((err) => console.log(err))
    ;

app.set('view engine', 'ejs');

//middleware && static
app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About us' });
})
app.get('/posts/create', (req, res) => {
    res.render('create', { title: 'Create New Post' });
})

//post routes
app.get('/posts', (req, res) => {
    Post.find().sort({createdAt: -1})
        .then((result) => {
            res.render('posts',{title: 'All Posts',posts: result});
        })
        ;
});

app.post('/posts',(req,res,next)=>{
    const post = new Post(req.body);
post.save();
    res.redirect('/posts');
});

app.get('/posts/:id',(req,res)=>{
Post.findById(req.params.id)
.then((result)=>
{
    res.render('post',{title: 'Post in details',post: result})
})
.catch((err)=>{console.log(err);})
;
})

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})

