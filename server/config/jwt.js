const verify = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    
    return res.status(401).json({ authenticated: false, message: 'Please log in' });
};

const verifyAdmin = (req, res, next) => {
    if(req.isAuthenticated() && req.user.admin) {
        return next();
    }

    return res.status(401).json({ authenticated: false, message: 'Please log in' });
}


module.exports.verify = verify;
module.exports.verifyAdmin = verifyAdmin;