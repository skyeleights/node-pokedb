const fs = require("fs");
const http = require("http");
const url = require("url");
const temp = fs.readFileSync(`${__dirname}/index.html`, "utf-8");
const card = fs.readFileSync(`${__dirname}/card.html`, "utf-8");
const data = [
  { id: 0, name: "pikachu", type: "lightning " },
  { id: 1, name: "charmander", type: "fire" },
  { id: 2, name: "squirtle", type: "water" },
  { id: 3, name: "bulbasaur", type: "grass" },
];
const funPut = function (el, card) {
  let output = card.replace(/{%NAME%}/g, el.name);
  output = output.replace(/{%TYPE%}/g, el.type);
  output = output.replace(/{%ID%}/g, el.id);
  return output;
};
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  if (pathname === "/") {
    res.writeHead(200, { "Content-type": "text/html" });
    const cards = data.map((el) => funPut(el, card)).join("");
    const cardsInTemp = temp.replace("{%CARD%}", cards);
    res.end(cardsInTemp);
  } else if (pathname === "/details") {
    res.writeHead(200, { "Content-type": "text/html" });
    const result = funPut(data[query.id], card);
    res.end(result);
  } else {
    res.writeHead(404, { "Content-type": "text/html" });
    res.end("not found");
  }
});
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request on port 8000");
});
