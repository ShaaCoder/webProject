const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const verifyToken = require('../verifyToken')
//Create
router.post("/create",verifyToken,async (req,res)=>{
    try{
        const newPost = new Post(req.body)
        const savedPost = await newPost.save()
        res.status(200).send(savedPost)
    }
    catch(err){
        res.status(500).json(err)
    }
})
//update
router.put("/:id",verifyToken,async (req,res)=>{
    try{
        const updatedUser = await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).send(updatedUser)
    }
    catch(err){
        res.status(500).json(err)
    }
})
//delete user
router.delete("/:id",verifyToken,async (req,res)=>{
    try{
       await Post.findByIdAndDelete(req.params.id)
       await Comment.deleteMany({postId:req.params.id})
       
       res.status(200).json("Post deleted successfully")
    }
    catch(err){
        res.status(500).json(err)
    }
})
//Get Method
router.get("/:id",async (req,res)=>{
    try{
       const post = await Post.findById(req.params.id)
      
       res.status(200).json(post)
      
    }
    catch(err){
        res.status(500).json(err)
    }
})
//get all posts
router.get("/",async (req,res)=>{
    const query=req.query
    
    try{
        const searchFilter={
            title:{$regex:query.search, $options:"i"}
        }
        const posts=await Post.find(query.search?searchFilter:null)
        res.status(200).json(posts)
    }
    catch(err){
        res.status(500).json(err)
    }
})
//Get user posts
router.get("/user/:userId",async (req,res)=>{
    try{
        const posts=await Post.find({userId:req.params.userId})
        res.status(200).json(posts)
    }
    catch(err){
        res.status(500).json(err)
    }
})

module.exports =router