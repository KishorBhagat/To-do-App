const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {

    const authToken = localStorage.getItem('auth-token');

    if (authToken) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            }
            else {
                console.log(decodedToken);
                next();
            }
        });
    }
    else {
        res.redirect('/login');
    }

}
// const requireAuth = (req, res, next) => {

//     // const authToken = localStorage.getItem('auth-token');
    
//     alert("middleware called");
//     next();

// }

module.exports = { requireAuth };