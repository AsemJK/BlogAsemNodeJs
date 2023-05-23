const Post = require('../models/post');

const app_index =(req,res)=>{
    res.render('index', { title: 'Home' });
}
const app_about = (req, res) => {
    res.render('about', { title: 'About us' });
}
const post_index = (req, res) => {
    Post.find().sort({createdAt: -1})
        .then((result) => {
            res.render('posts',{title: 'All Posts',posts: result});
        })
        ;
}
const post_get_create =  (req, res) => {
    res.render('create', { title: 'Create New Post' });
}
const post_create = (req,res,next)=>{
    const post = new Post(req.body);
    post.save();
    res.redirect('/posts');
}
const post_details = (req,res)=>{
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
    }
const post_delete = (req,res)=>{
    Post.findByIdAndDelete(req.params.id)
    .then((result)=>{res.json({redirect: '/posts'})})
    .catch((err)=>console.log(err))
}



module.exports = {
    app_index,
    app_about,
    post_index,
    post_get_create,
    post_create,
    post_details,
    post_delete
}