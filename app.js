const express = require("express");
const path = require("path");
const qr = require("qr-image");
const fs = require("fs");
const bodyparser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const app = express();
// app.use(express.static(path.join(__dirname, "qr")));

app.get("/", (req, res) => {
	res.send("QR");
});

const getRespType = (type) => {
	if (options.type == "svg") {
		return "svg";
	} else if (options.type == "pdf") {
		return "application/pdf";
	}
	return "image/png";
};
//test
app.get("/qr-async/:data", async (req, res) => {
	try {
		let options = { type: "png", ...req.query };
		const code = await qr.image(req.params.data, options);
		let restype = getRespType(options.type);
		res.type(restype);
		code.pipe(res);
	} catch (err) {
		console.log(err.stack);
		res.status(500).send(err);
	}
}).post("/qr-async", async (req, res) => {
	try {
		let options = { type: "png", ...req.query };
		const code = await qr.image(req.params.data, options);
		let restype = getRespType(options.type);
		res.type(restype);
		code.pipe(res);
	} catch (err) {
		console.log(err.stack);
		res.status(500).send(err);
	}
});

app.get("/qr/:data", (req, res) => {
	/* Synchronous Mode */
	try {
		let options = { type: "png", ...req.query };
		const code = qr.imageSync(req.params.data, options);
		const filePath = path.join(__dirname, "images", uuidv4() + "." + options.type);
		console.log(filePath);
		fs.writeFileSync(filePath, code);

		let restype = getRespType(options.type);
		res.type(restype);

		res.sendFile(filePath);
	} catch (err) {
		console.log(err.stack);
		return res.status(500).send(err);
	}
}).post("/qr", (req, res) => {
	/* Synchronous Mode */
	try {
		let options = { type: "png", ...req.query };
		const code = qr.imageSync(req.params.data, options);
		const filePath = path.join(__dirname, "images", uuidv4() + "." + options.type);
		console.log(filePath);
		fs.writeFileSync(filePath, code);

		let restype = getRespType(options.type);
		res.type(restype);

		res.sendFile(filePath);
	} catch (err) {
		console.log(err.stack);
		return res.status(500).send(err);
	}
});

app.listen(3000, () => {
	console.log("Server running at port 3000");
});
