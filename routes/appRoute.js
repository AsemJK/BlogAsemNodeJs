const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
})

router.get('/about', (req, res) => {
    res.render('about', { title: 'About us' });
})
router.get('/posts/create', (req, res) => {
    res.render('create', { title: 'Create New Post' });
})

//post routes
router.get('/posts', (req, res) => {
    Post.find().sort({createdAt: -1})
        .then((result) => {
            res.render('posts',{title: 'All Posts',posts: result});
        })
        ;
});

router.post('/posts',(req,res,next)=>{
    const post = new Post(req.body);
    post.save();
    res.redirect('/posts');
});

router.get('/posts/:id',(req,res)=>{
Post.findById(req.params.id)
.then((result)=>
{
    if(result)
    res.render('post',{title: 'Post in details',post: result})
    else
    res.redirect('/posts');    
})
.catch((err)=>{console.log(err);})
;
});

router.delete('/posts/:id',(req,res)=>{
    Post.findByIdAndDelete(req.params.id)
    .then((result)=>{res.json({redirect: '/posts'})})
    .catch((err)=>console.log(err))
});


module.exports = router;