const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const verify = require('../config/jwt').verify;
require('dotenv').config();

//No need for Reading comments because they are included with the GET a single post request

//Add a comment
router.post('/create', verify, async (req, res) => {
    try {
        const comment = await prisma.comment.create({
           data: {
                description: req.body.description, //might be changed due to a rich text editor
                userid: req.body.userid,
                postid: Number(req.body.postid)
           }
        });

        if(!comment) {
            return res.status(500).json({message: 'Could not create post'});
        }

        res.status(200).json({
            authenticated: true,
            message: 'Added comment successfully',
            comment: comment
        });
    } catch(err) {
        console.error(err);
        return res.status(500).json({message: 'Error adding comment'});
    }
});

//Delete a post
router.delete('/:id/delete', verify, async (req, res) => {
    try {
        const {id} = req.params;
        const post = await prisma.comment.delete({
            where: {id: id}
        });

        if(!comment) {
            return res.status(500).json({message: 'Could not delete comment'});
        }

        res.status(200).json({
            authenticated: true,
            message: 'Deleted comment successfully',
            comment: comment
        });
    } catch(err) {
        console.error(err);
        return res.status(500).json({message: 'Error deleting comment'});
    }
})

module.exports = router;