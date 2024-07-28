import express from "express";
import {dirname} from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const dirname1 =dirname(fileURLToPath(import.meta.url));

const app = express()
const port = 3000
app.use(bodyParser.urlencoded({extended:true}));

var auth=false;


function checkPassword(req,res,next) {
    const pwd=req.body["password"];
    if (pwd==="Password"){
        auth=true;
    }
    // console.log(pwd);
    next();
}

app.use(checkPassword); // MiddleWare Auth Check

app.get('/', (req, res) => res.sendFile(dirname1+"/public/index.html"))

app.post("/check",(req,res)=>{
    if (auth) {
        res.sendFile(dirname1+"/public/secret.html");
        auth=false;
    }
    else{
        res.redirect("/");
    }
})

app.get("/check",(req,res)=>{
        res.redirect("/");
})


app.listen(port, () => console.log(` App Started on Port ${port}!`))