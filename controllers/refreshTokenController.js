const userDB = {
    users: require('../model/user.json'),
    setUsers: (data) => { this.users = data }
}
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken');
const fsPromise = require('fs').promises;
const path = require('path')

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt

    const foundUser = userDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) return res.sendStatus(403);//forbidden
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username != decoded.username) return res.sendStatus(403);//forbidden
            const roles = Object.values(foundUser.roles)
            const accessToken = jwt.sign(
                { "UserInfo": { "username": decoded.username, "roles": roles } },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1000s' }
            )
            res.json({ accessToken })
        }
    )
}

module.exports = { handleRefreshToken }