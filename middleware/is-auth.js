const jwt = require('jsonwebtoken');

module.exports = {
    isAuth: (req, res, next) => {
        const bearerHeader = req.get('Authorization');
        //check if iberer is undefined
        if(typeof bearerHeader !== 'undefined'){
            const bearer = bearerHeader.split(' ');
            //get token from array
            const bearerToken = bearer[1];
            jwt.verify(bearerToken, 'secretkey', (err, authData) => {
                if(err) {
                    res.sendStatus(403);
                }else{
                    req.userId = authData.userId;
                    next();
                }
            })
        } else{
            //Forbidden
            res.sendStatus(403)
        }
    }
};