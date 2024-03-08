const jwt = require('jsonwebtoken');

const getToken = (admin) => {
    return jwt.sign(
        {
            email: admin.email,
            name: admin.name,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRATION,
        }
    );
};

module.exports = getToken;