const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');

const { mongoUrl } = process.env;


console.log('> Connecting to Database');
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('>\x1b[32m Connected to Database\x1b[0m');
  })
  .catch((err) => {
    console.log(`>\x1b[31m Failed to Connect to Database\x1b[0m \n${err}`);
    process.exit(1);
  });

const server = http
  .createServer(app)
  .listen(process.env.PORT || 3000, () => {
    console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
  });

module.exports = server;
