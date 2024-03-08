const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
    const authorizationHeader = req.headers?.authorization || '';
    const token = authorizationHeader.split(' ')[1];
    if (!token) {
        return res.status(403).send({
            message: 'Forbidden Access!',
        });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: 'Unauthorized!',
            });
        }
        req.email = decoded.email;
        next();
    });
};

module.exports = isAuth;