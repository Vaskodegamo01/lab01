import fs from "fs";
const path = "./messages/";

export default {
    data: [],
    readFile(callback){
            fs.readdir(path, (err, files) => {
                if (err) {
                    throw err;
                }
                let control=0;
                files.reverse().forEach(file => {
                    fs.readFile(path + file, "utf8", (err, res) => {
                        if (err) {
                            throw err;
                        }
                        this.data.push(JSON.parse(res)[0]);
                        ++control;
                        if (control === 5) {  //ждем пока 5 последних файлов будут прочитаны
                            callback();
                        }
                    });
                });
            });
    },
    addItem(item){
        this.data.push(item);
    },
    saveData(callback){
        let now = new Date();
        fs.writeFile(path + now.toISOString() + ".txt", JSON.stringify(this.data), err => {
            if (err) throw err;
        });
        callback();
    }
};