const fs = require("fs");

fs.readFile("/message.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  var node = document.getElementById("node-id");
  var newNode = document.createElement("p");
  newNode.appendChild(document.createTextNode("Text Results"));
  node.appendChild(Data);
});
