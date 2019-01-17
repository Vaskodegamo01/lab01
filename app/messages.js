import express from "express";
import nanoid from "nanoid";
import fsDemo from "../fsDemo";

const  router = express.Router();

router.get("/:messages", (req, res) => {
    if(!req.query.datatime){
        fsDemo.readFileAll(()=>{res.send(fsDemo.data);
        })
    }else{
        if(req.query.datatime.getData() === NaN){
            res.status(400).send({error: "Time have bad format"})
        }
        else{
            fsDemo.readFileAll(()=>{res.send(fsDemo.data);
            }, req.query.datatime.toISOString())
        }
    }
});

router.post("/messages", (req, res) => {
    if(req.body.author == "" || req.body.message == ""){
        res.status(400).send({error: "Author and message must be present in request"});
        return;
    }
    req.body.id = nanoid(10);
    req.body.datetime = new Date();
    fsDemo.addItem(req.body);
    fsDemo.saveData(()=>res.send(fsDemo.data));
    fsDemo.data = [];  //обнуляем data один файл одна запись
});

export default router;