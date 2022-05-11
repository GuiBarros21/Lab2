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
                    <form action="/write-message" method="POST">
                        <input type="text" name="message" />
                        <button type="submit">Submit</button>
                    </form>
                </body>
            </html>
        `);
    res.end();
  }

  if (url === "/write-message" && method === "POST") {
    // console.log(req.body)
    const body = [];

    req.on("data", (chunk) => {
      // console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      // console.log({ parsedBody });
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
