const jwt = require('jsonwebtoken')

function auth(req,res,next){
    const jwtoken = req.header('Authorization')
    if(!jwtoken){
        return next.status(404).send('Acceso denegado, necesitas un token')
    }

    try{
        const payload = jwt.verify(jwtoken, 'c0ntr4s3n14')
        next()
    }catch (e){
        res.status(400).send('Acceso denegado, el token no es valido');
    }
}

module.exports = auth;