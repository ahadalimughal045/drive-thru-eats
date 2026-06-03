const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = false; // Set to false for production
const app = next({ dev });
const handle = app.getRequestHandler();

// cPanel Node.js Selector passes a custom port or named pipe in process.env.PORT
const port = process.env.PORT || 3000;

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
