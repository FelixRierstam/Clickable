"use strict";
//import { Chicken } from "./chicken";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//console.log('helleeo');
//const chicken = new Chicken();
//chicken.cluck();
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 6060;
app.use(express_1.default.static(path_1.default.join(__dirname, '../')));
app.use(express_1.default.static(path_1.default.join(__dirname, '../site')));
app.get("/script.js", (req, res) => {
    res.sendFile(__dirname + "/script.js");
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map