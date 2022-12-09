const http = require('http');
const app = require('./src/app');
const config = require('./src/config');

(async function run() {
  const server = http.createServer(app);

  server.listen(config.PORT, config.HOST);
  console.log(`Server running on ${config.HOST}:${config.PORT}`);

  ['SIGINT', 'SIGTERM'].forEach((signal) => {
    process.on(signal, async () => {
      server.close();
      process.exit(1);
    });
  });
}());
