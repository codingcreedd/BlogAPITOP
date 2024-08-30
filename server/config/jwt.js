const verify = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({ authenticated: false, message: 'Please log in' });
};


module.exports.verify = verify;