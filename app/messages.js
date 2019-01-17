import express from "express";
import fsDemo from "../fsDemo";

const  router = express.Router();

router.get("/:messages", (req, res) => {
    if(req.params.messages === "messages"){ //делаем проверку правильный ли нам пришел запрос
        //res.send(fsDemo.readFile());
        fsDemo.readFile(()=>{res.send(fsDemo.data);
        })
    }else{
        res.send("неправильный запрос");
    }
});

router.post("/messages", (req, res) => {
    req.body.datetime = new Date();
    fsDemo.addItem(req.body);
    fsDemo.saveData(()=>res.send(fsDemo.data));
    fsDemo.data = [];  //обнуляем data один файл одна запись
});

export default router;