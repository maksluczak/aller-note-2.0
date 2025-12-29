const Note = require("../../models/Note");

const getNoteByDate = async (req, res) => {
    try {
        const userId = req.user;
        const noteDate = req.params.noteDate;

        const note = await Note.findOne({ noteUser: userId, noteDate: noteDate });

        if (!note) {
            return res.status(200).json({ message: "Note does not exist yet", note: null });
        }

        return res.status(200).json({
            message: "Note found succesfully",
            note: note
        });
    } catch (err) {
        return res.status(500).json({ message: "An error occurred, note cannot be find" });
    }
};

module.exports = getNoteByDate;