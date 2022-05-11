const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write(`
            <html>
                <head>
                    <title>First Page</title>
                </head>
                <body>
                    <h1>Hello Node!</h1>
                    <a href ="read-message">Read message</a>
                    <a href="write-message">Write message</a>
                </body>
            </html>
        `);
    res.end();
  }

  if (url === "/write-message" && method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();

      const message = parsedBody.split("=")[1];

      fs.writeFile("message.txt", message, (err) => {
        if (err) throw err;
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
});
server.listen(8000);
