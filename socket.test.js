const io = require('socket.io-client');
const http = require('http');
const ioBack = require('socket.io');

const app = require('./app');

/**
 * @type {http.Server}
 */
let server;
/**
 * @type {http.AddressInfo}
 */
let serverAddress;

/**
 * @type {SocketIOClient.Socket}
 */
let socket;
/**
 * @type {SocketIO.Server}
 */
let ioServer;

/**
 * Setup WS & HTTP servers
 */
beforeAll(async () => {
  server = http.createServer(app).listen(process.env.PORT || 3000);
  serverAddress = server.address();
  ioServer = ioBack();
  ioServer.attach(server);
});

/**
 *  Cleanup WS & HTTP servers
 */
afterAll((done) => {
  ioServer.close();
  server.close();
  done();
});

/**
 * Run before each test
 */
beforeEach((done) => {
  // Setup
  // Do not hardcode server port and address, square brackets are used for IPv6
  socket = io.connect(`http://localhost:${serverAddress.port}`, {
    'reconnection delay': 0,
    'reopen delay': 0,
    'force new connection': true,
    transports: ['websocket'],
  });
  socket.on('connect', () => {
    done();
  });
});

/**
 * Run after each test
 */
afterEach((done) => {
  // Cleanup
  if (socket.connected) {
    socket.disconnect();
  }
  done();
});


describe('basic socket.io example', () => {
  test('should communicate', () => new Promise((done) => {
    ioServer.emit('echo', 'Hello World');
    socket.once('echo', (message) => {
      // Check that the message matches
      expect(message).toBe('Hello World');
      done();
    });
    ioServer.on('connection', (mySocket) => {
      console.log(mySocket);
      expect(mySocket).toBeDefined();
      // once connected, emit Hello World
    });
  }));
  test('should communicated', () => new Promise((done) => {
    ioServer.emit('echo', 'Hello World');
    socket.once('echo', (message) => {
      // Check that the message matches
      expect(message).toBe('Hello World');
      done();
    });
    ioServer.on('connection', (mySocket) => {
      expect(mySocket).toBeDefined();
      // once connected, emit Hello World
    });
  }));
});
