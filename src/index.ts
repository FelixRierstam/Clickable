//import { Chicken } from "./chicken";

//console.log('helleeo');

//const chicken = new Chicken();
//chicken.cluck();
import express from "express";
import path from "path";

const app = express();
const port = 6060;

app.use(express.static(path.join(__dirname, '../')));

app.use(express.static(path.join(__dirname, '../site')));

app.get("/script.js", (req, res) => {
    res.sendFile(__dirname + "/script.js");
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});