const fsPromises = require('fs').promises;
const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');
const { v4: uuid } = require('uuid')

const logEvents = async (message, filename) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logTime = `${dateTime}\t${uuid()}\t${message}\n`
    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', filename), logTime)
    } catch (err) {
        console.log(err);
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    next();
}
module.exports = { logEvents, logger }