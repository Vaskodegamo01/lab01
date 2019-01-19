import express from "express";
import messages from "./app/messages";

const app = express();
const port = 3333;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});
app.use(express.json());
app.use("/", messages);

app.listen(port, () => console.log("server start at " + port));
