import express from "express";
const port = 8000;

const app = express();

app.get("/", (req, res) => {
	res.send("<h1>Hello from express + TS</h1>");
});

app.listen(port, () => {
	console.log(`now listening on port ${port}`);
});
