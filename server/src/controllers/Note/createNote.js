const User = require('../../models/User');
const Note = require('../../models/Note');

const createNote = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).exec();
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const date = req.params.noteDate;

        const { well_being, headache, runny_nose, itchy_nose, itchy_eyes, cough, free_note } = req.body;

        const note = await Note.create({
            noteUser: user._id,
            wellBeing: well_being || 0,
            headache: headache || 0,
            runnyNose: runny_nose || 0,
            itchyNose: itchy_nose || 0,
            itchyEyes: itchy_eyes || 0,
            cough: cough || 0,
            freeNote: free_note || "",
            noteDate: date
        });

        user.userNotes.push(note._id);
        await user.save();

        return res.status(201).json({
            message: "Note added successfully.",
            note: note
        });
    } catch (err) {
        return res.status(500).json({ message: "An error occurred during note creation." });
    }
};

module.exports = createNote;