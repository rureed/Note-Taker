const path = require('path');
const fs = require('fs');

const read = () => {

    const noteData = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')))
    return noteData;
}

const write = (noteData) => {
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(noteData), (err) => {
        if (err) return ({ err });
    })
}

const newNoteId = () => noteId++;

module.exports = function (app) {

    app.get("/api/notes", (req, res) => {

        let noteData = read();
        res.json(noteData)
        console.log("show");
    })

    app.post('/api/notes', (req, res) => {
        let noteData = read();
        let newNote = req.body;
        let lastNoteID = !noteData[0] ? 0 : noteData[noteData.length - 1].id;
        let newNoteID = lastNoteID + 1

        newNote.id = newNoteID;
        noteData.push(newNote);
        write(noteData);
        return res.json(noteData)
    })

    app.delete('/api/notes/:id', (req, res) => {
        let noteData = read();
        const noteId = req.params.id;
        const newNoteData = noteData.filter((note) => note.id != noteId);
        write(newNoteData);
        res.send(newNoteData);
        console.log("delete");
    })
}