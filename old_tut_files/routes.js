// const fs = require('fs');
// const requestHandler = (req, res) => {

//     const url = req.url;
//     const method = req.method;
//     if (url === '/') {
//         res.setHeader('Content-type', 'text/html')
//         res.write('<html>')
//         res.write('<head></head>')
//         res.write(`<body>
//         <form enctype="multipart/form-data" action="/message" method="POST">
//         <input placeholder="name" name="message" type="text" />
//         <input placeholder="name" name="file" type="file" />
//         <input placeholder="class" type="submit" value="send"/>
//         </body>`)
//         res.write('</html>')
//         return res.end()
//     }

//     if (url === '/message' && method === 'POST') {

//         const body = []
//         req.on('data', (chunk) => {
//             body.push(chunk)
//             console.log("chunk", chunk);
//         })
//         return req.on('end', () => {
//             const bodyParser = Buffer.concat(body).toString();
//             const message = bodyParser.split("=")
//             fs.writeFile('hello.txt', message[1], (err) => {
//                 // fs.writeFileSync('hello.txt', 'var d = 10;')
//                 res.setHeader('Location', '/');
//                 res.statusCode = 302;
//                 return res.end();
//             })
//         })



//     }

//     res.setHeader('Content-type', 'text/html')
//     res.write('<html>')
//     res.write('<head></head>')
//     res.write(`<body>
//     <h1>the Name is kabilan</h1>
//     </body>`)
//     res.write('</html>')
//     res.end();
// }


// Dave Gray channel notes 




// module.exports.handler = requestHandler 


exports.add = (a, b) => a + b;
exports.sub = (a, b) => a - b;
exports.mul = (a, b) => a * b;
exports.div = (a, b) => a / b;


// module.exports = { add, sub, div, mul }