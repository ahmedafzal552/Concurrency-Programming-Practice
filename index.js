const express = require("express");
const bodyParser = require("body-parser");
const WebSocket = require("ws");

const PORT = 3000;
app = express();
app.use(bodyParser.urlencoded({extended: true}));

let viewCount = 0;

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

//url parameter
app.get("/params/:display", (req, res) => {
    res.send(req.params.display);
})

//url querey
app.get("/query", (req, res) => {
    res.send(`The number is: ${req.query.number} and the text is: ${req.query.text}`);
})

app.post("/form", (req, res) => {
    if (req.body.password == "password") {
        res.redirect("/hello");
    }
    res.send(`The username is: ${req.body.username} and the password is: ${req.body.password}.`);
})

const httpServer = app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`);
});

const wsServer = new WebSocket.Server( {noServer: true });

httpServer.on("upgrade", async (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, (ws) => {
        wsServer.emit("connection", ws, request);
    });
});

//Group Chat
wsServer.on("connection", (ws) => {
    ws.on("message", (message) => {
        console.log(message);
        
    })
})