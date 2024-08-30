const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const genPass = require('../lib/passwordUtils').genPassword;
const prisma = new PrismaClient();
const passport = require("passport");
const jwt = require('jsonwebtoken');
// const { token } = require('morgan');

require('dotenv').config();

router.post('/signup', async (req, res) => {
    try {
        const username = req.body.uname;
        const genHash = genPass(req.body.pw);
        const hashpassword = genHash.hash;
        const salt = genHash.salt;

        const response = await prisma.user.create({
            data: {
                username,
                hashpassword,
                salt
            }
        });

        if(response) {
            res.status(201).json({
                message: 'User created successfully',
                response: response
            });
        } else {
            res.status(500).json({
                message: 'Failed to create user'
            })
        }

    } catch(err) {
        res.status(500).json({
            message: 'Error creating user'
        })
        console.error(err);
    }
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    console.log('Session --- ', req.session);
    delete req.user.hashpassword;
    delete req.user.salt;
    console.log('USER: ', req.user);

    if(!req.session.passport || !req.session.passport.user) {
        return res.status(401).json({
            message: 'Login failed'
        })
    } else {
        return res.status(200).json({
            message: 'Login successful'
        })
    }
});

// router.get('/isauthenticated',  (req, res) => {
//     if(req.isAuthenticated()) {
//         return res.status(200).json({authenticated: true})
//     } else {
//         return res.status(200).json({authenticated: false})
//     }
// });

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err); 
        }
        res.status(200).json({
            message: 'Logged out successfully'
        });

        if(req.session.passport) {
            console.log(req.session.passport);
        } else {
            console.log(req.session);
        }
    });
})

module.exports = router;