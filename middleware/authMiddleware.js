const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

const requireAuth = (req, res, next) => {

    let token = req.cookies.authToken;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                // console.log(err.message);
                res.redirect('/login');
            }
            else {
                // console.log(decodedToken);
                next();
            }
        });
    }
    else {
        res.redirect('/login');
    }

}

module.exports = { requireAuth };