var express = require('express');
var morgan = require('morgan');
var cors = require('cors')
require('express-async-errors');



const app = express();

app.use(cors())

app.use(morgan('dev'));
app.use(express.json());

app.get('/', function(req, res) {
    res.json({
        message: 'hello sakila backend!'
    })
})

const filmRoute = require('./routes/film.route');
app.use('/api/films', filmRoute);

const actorRoute = require('./routes/actor.route');
app.use('/api/actors', actorRoute);

const customerRoute = require('./routes/customer.route');
app.use('/api/customers', customerRoute);

app.get('/err', function(req, res) {
    throw new Error('BROKEN');
})

app.use(function(req, res, next) {
    res.status(404).json({
        error_message: 'Endpoint not found!'
    });
});
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({
        error_message: 'Something broke!'
    });
});

const PORT = 3000
app.listen(PORT, function() {
    console.log(`Sakila backend is running at http: //localhost:${PORT}`);
})