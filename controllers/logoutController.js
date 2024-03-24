const userDB = {
    users: require('../model/user.json'),
    setUsers: (data) => { this.users = data }
}

const fsPromise = require('fs').promises;
const path = require('path')

const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt

    const foundUser = userDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true })
        return res.sendStatus(204)
    };//forbidden

    const otherUsers = userDB.users.filter(person => person.refreshToken != foundUser.refreshToken)
    const currentUser = { ...foundUser, refreshToken: '' }
    userDB.setUsers([...otherUsers, currentUser]);
    await fsPromise.writeFile(path.join(__dirname), '..', 'model', 'user.json'), JSON.stringify(userDB.users)

    res.clearCookie('jwt', { httpOnly: true })//on httpsServers -.>secure:true
    res.sendStatus(204)
}

module.exports = { handleLogout }