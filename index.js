const express = require("express");
const bodyParser = require("body-parser");

const PORT = 3000;
app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    console.log("Yay, a visitor");
    console.log(req);
    res.send("Welcome to the Web Server");
})

app.get("/hello", (req, res) => {
    res.send("<h1>Hello</h1><p>How are you?</p>");
})

app.get("/html", (req, res) => {
    res.sendFile("index.html", {root: __dirname});
})




app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`);
})