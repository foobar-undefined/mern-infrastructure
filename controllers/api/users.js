const User = require('../../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
module.exports = {
    create, 
    login, 
    checkToken
}

async function login(req, res) {
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user) return res.status(400).json({error: 'invalid credentials'})
    
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch) return res.status(400).json({error: 'invalid credentials'})
        
        const token = createJWT(user);
        res.json(token);
    } catch (error) {
        res.status(400).json('Bad Credentials');
    }
}

async function create(req, res){
    try{
        // 1) create the user
        const user = await User.create(req.body);
        // 2) create the jwt by passing in th euser info for the jwt payload
        const token = createJWT(user);
        // 3) send the new jwt to the client using res.json
        res.json(token);
    }catch(error){
        // if error, we'll send the error to the client
        res.status(400).json(error);
    }
}
function checkToken(req, res){
    console.log('req.user', req.user);
    res.json(req.exp);
}

function createJWT(user){
    return jwt.sign({ user }, process.env.SECRET, {expiresIn: '24h'});
}