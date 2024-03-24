const fs = require('fs')

const rs = fs.createReadStream('./files/lorem.txt', { encoding: 'utf-8' })

const ws = fs.createWriteStream('./files/new-lorem.text');

// rs.on('data', (dataChunk) => {
//     ws.write(dataChunk)
//     console.log('data written completely');
// })


rs.pipe(ws);