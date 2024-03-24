const logEvents = require('./logEvents');

const EventEmitter = require('events');

class MyEventEmitter extends EventEmitter { }

const myEmitter = new MyEventEmitter();

myEmitter.on('log', (msg, msg2) => logEvents(msg, msg2))

setTimeout(() => {
    myEmitter.emit('log', 'Log Event is Emitted', 'second param')
}, 2000)


// 1.30

// ===========================================================================================================
// const { format } = require('date-fns');
// const { v4: uuid } = require('uuid');
// console.log(format(new Date(), 'yyyyMMdd\t\tHH:mm'));
// console.log(uuid());
// console.log(uuid());
// ===========================================================================================================
// const fs = require('fs');
// console.log(fs);
// if (!fs.existsSync('./new')) {
//     fs.mkdir('./new', err => {
//         if (err) throw err
//         console.log('Diretiry created successfully');
//     })
// }
// if (fs.existsSync('./new')) {
//     fs.rmdir('./new', err => {
//         if (err) throw err
//         console.log('Diretiry removed successfully');
//     })
// }
// =========================================================
// const fsPromises = require('fs').promises;
// const path = require('path')
// const fileOps = async () => {
//     try {
//         const data = await fsPromises.readFile(path.join(__dirname, 'files', 'lorem.txt'), 'utf-8')
//         console.log(data);
//         await fsPromises.unlink(path.join(__dirname, 'files', 'lorem.txt'))
//         await fsPromises.writeFile(path.join(__dirname, 'files', 'Prolorem.txt'), 'hi from raghul')
//         await fsPromises.appendFile(path.join(__dirname, 'files', 'Prolorem.txt'), '\n\n data new appended area')
//         await fsPromises.rename(path.join(__dirname, 'files', 'Prolorem.txt'), path.join(__dirname, 'files', 're-Prolorem.txt'))
//         const newData = await fsPromises.readFile(path.join(__dirname, 'files', 're-Prolorem.txt'), 'utf-8')
//         console.log(newData);
//     } catch (err) {
//         console.log(err);
//     }
// }
// fileOps();
// fs.readFile(path.join(__dirname, 'files', 'lorem.txt'), 'utf-8', (err, data) => {
//     if (err) throw err
//     console.log(data);
// })
// console.log('helllo---------->', path.join(__dirname, 'files', 'lorem.txt'));
// fs.writeFile(path.join(__dirname, 'files', 'lorem-11.txt'), 'nice to meet you', (err) => {
//     if (err) throw err
//     console.log('Write  complete');
//     fs.appendFile(path.join(__dirname, 'files', 'lorem-11.txt'), 'nice to meet you again appended', (err) => {
//         if (err) throw err
//         console.log('Append complete');
//         fs.rename(path.join(__dirname, 'files', 'lorem-11.txt'), path.join(__dirname, 'files', 're-lorem-11.txt'), (err) => {
//             if (err) throw err
//             console.log('rename complete');
//         })
//     })
// })

// process.on('uncaughtError', err => {
//     console.error('there a error', err)
//     process.exit(1)
// })

// const os = require('os');
// const path = require('path');
// const { add, sub, div, mul } = require('./routes')

// console.log(add(2, 3));
// console.log(sub(2, 3));
// console.log(div(2, 3));
// console.log(mul(2, 3));

// console.log(os.type());
// console.log(os.version());
// console.log(os.homedir());

// console.log(path.join(__dirname), 'kitty');
// console.log(__filename);

// console.log('path.dirname(__filename)', path.dirname(__filename));
// console.log('path.basename(__filename)', path.basename(__filename));
// console.log('path.basename(__filename)', path.extname(__filename));

// console.log(path.parse(__filename), '---------------->>>>>>');

// const http = require('http');
// const routes = require('./routes')
// console.log("print due to nodemon");
// const server = http.createServer(routes.handler);
// server.listen('3000')

