const qr = require("qr-image");
const fs = require("fs");
const path = require("path");

const code = qr.imageSync("http://www.google.com", { type: "png" });
const filepath = path.join(__dirname, "qr.png");
const output = fs.createWriteStream;
