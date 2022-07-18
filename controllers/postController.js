const Post = require('./../models/postModel');

exports.getAllPosts = async ( req, res, next ) => {
 try {
    const posts = await Post.find();

    res.status(200).json({
        status: 'success',
        results: posts.length,
        data: {
            posts
        }
    })


 }catch(err){
    res.status(400).json({
        status: 'failed'
    })
 }
}

exports.getPost = async ( req, res, next ) => {
 try {
    const post = await Post.find({id : req.params.id});

    res.status(200).json({
        status: 'success',
        data: {
            post
        }
    })
 }catch(err){
    res.status(400).json({
        status: 'failed',
        data : err.message
    })
 }
}

exports.createPost = async ( req, res, next ) => {
 try {
    const post = await Post.create(req.body);
    res.status(200).json({
        status: 'success',
        data: {
            post
        }
    })
 }catch(err){
    res.status(400).json({
        status: 'failed',
        data : err.message
    })
 }
}

exports.updatePost = async ( req, res, next ) => {
    try {
       const post = await Post.findByIdAndUpdate(req.params.id);
   
       res.status(200).json({
           status: 'success',
           data: {
               post
           }
       })
    }catch(err){
       res.status(400).json({
           status: 'failed'
       })
    }
   }

exports.deletePost = async ( req, res, next ) => {
    try {
       const post = await Post.findByIdAndDelete(req.params.id);
   
       res.status(200).json({
           status: 'success',
           data: {
               post
           }
       })
    }catch(err){
       res.status(400).json({
           status: 'failed'
       })
    }
   }

