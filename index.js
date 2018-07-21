const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');

const config = require('./server/config.json');

const app = express();

const server = http.createServer(app);
const port = process.env.PORT || config.port;
const io = socketIo(server);

const users = require('./server/routes/user');
const dishes = require('./server/routes/dish');
const orders = require('./server/routes/order')(io);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use('/users', users);
app.use('/dishes', dishes);
app.use('/orders', orders);

app.use(function(req, res){
	res.status(404).send('404 Not Found');
});

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${config.db.user}:${config.db.pass}@${config.db.host}/${config.db.name}`, { useNewUrlParser: true })

  .then(() =>  {
    console.log('mongo DB connection successful');

    server.listen(port, () => console.log(`Server run on port ${port}`));
  })
  .catch((err) => console.error(err));

io.on('connection', (socket) => {
});