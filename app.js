const express = require('express');
const path = require('path');
const http = require('http');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use('/api', require('./api'));

(async () => {
  console.log('> Connecting to Database');
  try {
    await mongoose.connect(config.mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('>\x1b[32m Connected to Database\x1b[0m');
  } catch (err) {
    console.log(`>\x1b[31m Failed to Connect to Database\x1b[0m \n${err}`);
    process.exit(1);
  }
})();

const server = http
  .createServer(app)
  .listen(process.env.PORT || 3000, () => {
    console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
  });

module.exports = server;
