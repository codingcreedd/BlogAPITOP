const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const verify = require('../config/jwt').verify;
require('dotenv').config();

//Get all posts
router.get('/all', async (req, res) => {
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

//Get post based on input change
router.post('/search-post', async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            where: {
                title: {
                    contains: req.body.search
                }
            },
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

//Get featured posts
router.get('/featured', async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            where: {featured: true},
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

//Get latest 5 posts
router.get('/latest', async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            take: 5,
            include: {comments: true},
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

//Get Main Post
router.get('/main', async (req, res) => {
    try {
        const mainPost = await prisma.post.findFirst({
            where: {main: true},
            include: {comments: true}
        });

        console.log(mainPost)

        if(!mainPost) {
            return res.status(500).json({message: 'Could not retreive main post'});
        }

        res.status(200).json({
            authenticated: true,
            message: 'Retreived main post successfully',
            mainPost: mainPost
        });
    } catch(err) {
        console.error(err);
        return res.status(500).json({message: 'Error retreiving main post'});
    }
})

//Get post
router.get('/:id/post', async (req, res) => {
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