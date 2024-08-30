require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const sessionStore = require('./prisma/db/index').sessionStore;
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');

//middlewares
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false
    }
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

require('./config/passport')
app.use(passport.initialize());
app.use(passport.session());

//Routes
const logs = require('./routes/logs');
const posts = require('./routes/posts');
const comments = require('./routes/comments');

app.use('/logs', logs);
app.use('/posts', posts);
app.use('/comments', comments);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is up an running on server ${port}`);
})