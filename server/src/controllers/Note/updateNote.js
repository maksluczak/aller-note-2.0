const Note = require("../../models/Note");

const updateNote = async (req, res) => {
    try {
        const userId = req.user;
        const { well_being, headache, runny_nose, itchy_nose, itchy_eyes, cough, free_note } = req.body;
        const noteDate = req.params.noteDate;

        const note = await Note.findOneAndUpdate(
            { noteUser: userId, noteDate: noteDate },
            {
                $set: {
                    wellBeing: well_being || 0,
                    headache: headache || 0,
                    runnyNose: runny_nose || 0,
                    itchyNose: itchy_nose || 0,
                    itchyEyes: itchy_eyes || 0,
                    cough: cough || 0,
                    freeNote: free_note || "",
                }
            },
            { new: true }
        );

        if (!note) {
            return res.status(404).json({ message: "Note not found for this date." });
        }

        return res.status(200).json({
            message: "Note updated successfully."
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

module.exports = updateNote;