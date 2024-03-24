const verifyRoles = (...allowedRoles) => {

    console.log("verify roles activating -----------------------------------------------------------");
    return (req, res, next) => {
        if (!req?.roles) return res.sendStatus(401);
        const rolesArr = [...allowedRoles];
        console.log(rolesArr, "+++++++++++++++++++++++");
        console.log(req.roles, "-----------------------S");
        const result = req.roles.map(role => rolesArr.includes(role)).find(item => item === true);
        if (!result) res.senStatus(401);
        next();
    }
}

module.exports = verifyRoles;