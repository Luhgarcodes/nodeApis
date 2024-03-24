
// 1.12
// 2.45
// 3.36
// 4.33
// 4.50
// a8zqKKfqGsVekEeS
// mongodb+srv://raghul:<password>@cluster0.uif1ebq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;
const { logger, logEvents } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const verifyJWT = require('./middleware/verifyJWT')
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')

connectDB()



app.use(logger)
app.use(credentials)
app.use(cors(corsOptions))


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '/public')));

app.use(cookieParser());

app.use('/', require('./routers/root'));
app.use('/register', require('./routers/register'));
app.use('/auth', require('./routers/auth'));
app.use('/refresh', require('./routers/refresh'));
app.use('/logout', require('./routers/logout'))

app.use(verifyJWT)
app.use('/employee', require('./routers/api/employee'))


//chain route handlers

const one = (req, res, next) => {
    console.log('one');
    next();
}

const two = (req, res, next) => {
    console.log('two');
    next();
}
const three = (req, res) => {
    console.log('three');
    res.send('Finished----------->😑😐😑😑')
}
app.get('/chain(.html)?', [one, two, three])

app.all('*', (req, res) => {
    res.sendStatus(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ error: '404 Page Not Found' })
    } else {
        res.type('text').send('404 Page Not Found')
    }

})


app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on Port ${PORT}`))
})

