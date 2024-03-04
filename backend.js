const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
  let isLogin = true;
  path = "./";
  if (isLogin) {
    if (req.url === "/") {
      path += "home.html";
    } else {
      path += "404.html";
    }
  } else {
    path += "index.html";
  }
  fs.readFile(path, (err, data) => {
    res.setHeader("Content-Type", "text/html");
    res.end(data);
  });
});

server.listen(3000);
