const jwt = require('jsonwebtoken');
const jwtSecret = 'PostAppApi';

const fetchUser = (req, res, next) => {
    const token = req.header('auth-token');
    
    if (!token) {
        return res.status(401).send({ error: 'Please Authenticate Using A Valid Token' });
    }

    try {
        const data = jwt.verify(token, jwtSecret);
        req.user = data.user;
        next();

    } catch (error) {
        return res.status(401).send({ error: 'Please Authenticate Using A Valid Token' });
    }
}
module.exports = fetchUser;