const express = require("express");
const path = require("path");
const port = 8080;
const exp = express();
const songRouter = require("./routers/songs");
const bodyParser = require("body-parser");

exp.use(bodyParser.urlencoded({ extended: true }));
exp.use(express.static(path.join(__dirname,"public")));

exp.use("/main",songRouter.rout);
// exp.use("/songs",songRouter.router)

exp.listen(port,"localhost",()=>{
    console.log("server in action on : 8080");
})







// res.attachment