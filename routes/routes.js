var express = require("express");
var path = require("path");
var fs = require("fs");



app.get("api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.post("api/notes", function (req, res) {
    let notepad = JSON.parse(fs.readFileSync("./db/db.json"));
    let newNote = req.body;
    notepad.push(newNote);
    fs.writeFileSync("../db/db.json", JSON.stringify(notepad));
    res.json(notepad);
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../db/db.json"));
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});





module.exports = app