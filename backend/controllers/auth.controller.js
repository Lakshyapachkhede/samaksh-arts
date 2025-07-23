const jwt = require('jsonwebtoken');

const {ADMIN_USERNAME, ADMIN_PASSWORD} = process.env;

function handleAdminLogin(req, res) {
 
    const {username, password} = req.body;


    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD){
        const token = jwt.sign({role: "admin"}, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
        return res.status(200).json({token})
    }

    res.status(401).json({ error: 'Invalid credentials' });
    
}

module.exports = {
    handleAdminLogin
}