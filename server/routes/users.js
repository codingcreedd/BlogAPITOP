const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const { verifyAdmin } = require('../config/jwt');
const prisma = new PrismaClient();
const verify = require('../config/jwt').verify;
require('dotenv').config();

//Get user
router.get('/:id/user', verify, async (req, res) => {
    try {
        const {id} = req.params;
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        });

        if(!user) {
            return res.status(500).json({message: 'Could not retreive user information'});
        }

        delete user.hashpassword;
        delete user.salt;


        res.status(200).json({
            authenticated: true,
            message: 'Retreived user successfully',
            user: user
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({message: 'Error retreiving user information'})
    }
})


module.exports = router;