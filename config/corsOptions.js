
const whitelist = require('./whiteList')

const corsOptions = {
    orgin: (orgin, callback) => {
        if (whitelist.indexOf(orgin) !== -1) {
            callback(null, true)//orgin will sent back to same area
        } else {
            callback(new Error('Not Allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;