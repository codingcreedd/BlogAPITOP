const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const verify = require('../config/jwt').verify;
require('dotenv').config();

//Get all posts
router.get('/all', verify, async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: {comments: true}
        });

        if(!posts) {
            return res.status(500).json({message: 'Could not retreive posts'});
        }

        res.status(200).json({
            authenticated: true,
            message: 'Retreived posts successfully',
            posts: posts
        });
    } catch(err) {
        console.error(err);
        return res.status(500).json({message: 'Error retreiving posts'});
    }
});

//Get post
router.get('/:id/post', verify, async (req, res) => {
    try {
        const {id} = req.params;
        const post = await prisma.post.findUnique({
            where: {id: id},
            include: {comments: true}
        });

        if(!post) {
            return res.status(500).json({message: 'Could not retreive post'});
        }

        res.status(200).json({
            authenticated: true,
            message: 'Retreived post successfully',
            post: post
        });
    } catch(err) {
        console.error(err);
        return res.status(500).json({message: 'Error retreiving post'});
    }
});

//Creat a post
router.post('/create', verify, async (req, res) => {
    try {
        const post = await prisma.post.create({
           data: {
                title: req.body.title,
                description: req.body.description, //might be changed due to a rich text editor
                userid: req.body.userid
           }
        });

        if(!post) {
            return res.status(500).json({message: 'Could not create post'});
        }

        res.status(200).json({
            authenticated: true,
            message: 'Created post successfully',
            post: post
        });
    } catch(err) {
        console.error(err);
        return res.status(500).json({message: 'Error creating post'});
    }
});

//Delete a post
router.delete('/:id/delete', verify, async (req, res) => {
    try {
        const {id} = req.params;
        const post = await prisma.post.delete({
            where: {id: id}
        });

        if(!post) {
            return res.status(500).json({message: 'Could not delete post'});
        }

        res.status(200).json({
            authenticated: true,
            message: 'Deleted post successfully',
            post: post
        });
    } catch(err) {
        console.error(err);
        return res.status(500).json({message: 'Error deleting post'});
    }
})

module.exports = router;