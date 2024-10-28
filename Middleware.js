// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next(); // If the session contains user data, proceed
    } else {
        res.status(401).json({ msg: 'You must be logged in to access this route' });
    }
}

module.exports = {isAuthenticated};