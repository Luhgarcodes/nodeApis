const userDB = {
    users: require('../model/user.json'),
    setUsers: function (data) { this.users = data }
}
const fsPromise = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');


const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.sendStatus(400).json({ message: "required username and password" })
    const duplicate = userDB.users.find(person => person.username == user);
    if (duplicate) return res.sendStatus(409)
    try {
        const hashPwd = await bcrypt.hash(pwd, 10);
        const newUser = {
            username: user,
            roles: { User: 2001 },
            password: hashPwd
        };
        userDB.setUsers([...userDB.users, newUser]);
        await fsPromise.writeFile(path.join(__dirname, '..', 'model', 'user.json'), JSON.stringify(userDB.users))
        console.log(userDB.users);
        res.sendStatus(201).json({ sucess: `new user ${user} Created` })
    } catch (err) {
        res.sendStatus(500).json({ message: err.message })
    }
}

module.exports = { handleNewUser };