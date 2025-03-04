const userDB = {
    users: require('../model/user.json'),
    setUsers: function (data) { this.users = data }
}
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken');
const fsPromise = require('fs').promises;
const path = require('path')

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    console.log(user, 'user');
    if (!user || !pwd) return res.sendStatus(400).json({ 'message': 'username and password are required' });
    const foundUser = userDB.users.find(person => person.username == user);
    if (!foundUser) return res.sendStatus(401);
    const match = await bcrypt.compare(pwd, foundUser.password)
    if (match) {
        const roles = Object.values(foundUser.roles)
        const accessToken = jwt.sign({ "UserInfo": { "username": foundUser.username, "roles": roles } },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1000s' }
        )
        const refreshToken = jwt.sign({ "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1000s' }
        )
        const otherUsers = userDB.users.filter(person => person.username !== foundUser.username)
        const currentUser = { ...foundUser, refreshToken }
        userDB.setUsers([...otherUsers, currentUser])
        await fsPromise.writeFile(path.join(__dirname, '..', 'model', 'user.json'), JSON.stringify(userDB.users))
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 3 * 24 * 60 * 60 * 1000 })
        // res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 })

        res.json({ accessToken })
    } else {
        res.sendStatus(401)
    }
}

module.exports = { handleLogin }