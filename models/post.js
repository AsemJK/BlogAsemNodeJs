const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    snippet:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: false
    }
},{timestamps: true});

const Post = mongoose.model('Post',postSchema);//here we named model 'Post' this the single of collection name !!!!!!

module.exports = Post;