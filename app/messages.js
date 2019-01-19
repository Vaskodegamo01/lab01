import express from "express";
import nanoid from "nanoid";
import fsDemo from "../fsDemo";

const  router = express.Router();

router.get("/:messages", (req, res) => {
    if(!req.query.datatime){
        fsDemo.readFileAll(()=>{res.send(fsDemo.data);
        fsDemo.data = [];
        })
    }else{
        let now = new Date(req.query.datatime);
        if(isNaN(now.getDate())){
            res.status(400).send({error: "Time have bad format"})
        }
        else{
            fsDemo.readFileAll(()=>{res.send(fsDemo.data);
            }, now.toISOString());
            fsDemo.data = [];
        }
    }
});

router.post("/messages", (req, res) => {
    if(req.body.author === "" || req.body.message === "" && req.body.author === undefined || req.body.message === undefined){
        res.status(400).send({error: "Author and message must be present in request"});
        return;
    }
    req.body.id = nanoid(10);
    req.body.datetime = new Date();
    fsDemo.addItem(req.body);
    fsDemo.saveData(()=>res.send({ok: fsDemo.data}));
    fsDemo.data = [];  //обнуляем data один файл одна запись
});

export default router;