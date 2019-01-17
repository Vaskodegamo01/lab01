import express from "express";
import messages from "./app/messages";

const app = express();
const port = 3333;

app.use(express.json());
app.use("/", messages);

app.listen(port, () => console.log("server start at " + port));
