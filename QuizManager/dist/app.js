"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import { MongoClient } from "mongodb";
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./routers/user"));
const app = (0, express_1.default)();
const connectionString = "mongodb+srv://faizansiddiqui:Bismillah@mycluster.zsttz8l.mongodb.net/workshopdb?retryWrites=true&w=majority";
// const client = new MongoClient(connectionString);
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Working");
});
app.use("/user", user_1.default);
const connect = mongoose_1.default.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
connect.then(() => {
    app.listen(3000, () => {
        console.log("Server Connected");
    });
});
// async function run() {
//   try {
//     await client.connect();
//     app.listen(3000, () => {
//       console.log("Server Connect");
//     });
//   } catch (err) {
//     console.log(err);
//   }
// finally {
//     await client.close();
// }
// }
// run();
