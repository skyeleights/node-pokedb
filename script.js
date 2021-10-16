const fs = require("fs");
const http = require("http");
const url = require("url");
const temp = fs.readFileSync(`${__dirname}/index.html`, "utf-8");

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  if (pathname === "/") {
    res.writeHead(200, { "Content-type": "text/html" });

    res.end(temp);
  } else {
    res.writeHead(404,{"Content-type":"text/html"});
    res.end("not found");
  }
});
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request on port 8000");
});
