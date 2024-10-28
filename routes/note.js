const express = require('express');
const Note = require('../models/Note');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { isAuthenticated } = require('../Middleware');


// display notes route
router.get('/showNote', isAuthenticated , async (req, res) => {
    try{
        const notes = await Note.find({
            user: req.session.user.id
        });
        res.status(200).json(notes);

    }catch{
        res.status(500).json({ msg: 'Server error' });
    }
});

// create note route
router.post('/createNote', isAuthenticated , async (req, res) => {

    const { title, content } = req.body;

    try{
        // res.send(req.body)
        note = new Note({
            title,
            content,
            user: req.session.user.id
        });

        await note.save();
        res.status(201).json({ msg: 'Note Save successfully' });

    }catch{
        res.status(500).json({ msg: 'Server error' });
    }
});

// delete note route
router.delete('/deleteNote/:id', isAuthenticated , async (req, res) => {
    try{
        const recordId = req.params.id;
        const deletedRecord = await Note.findByIdAndDelete(recordId);

        if (!deletedRecord) {
        return res.status(404).send('Record not found');
        }
        res.status(200).json({ message: 'Record deleted successfully', record: deletedRecord });

    }catch{
        res.status(500).json({ msg: 'Server error' });
    }
});

// edite note route
router.put('/editeNote/:id', isAuthenticated , async (req, res) => {
    try{
        const recordId = req.params.id;
        const updatedData = req.body; // Data to update
    
        // Find the record by ID and update it
        const updatedRecord = await Note.findByIdAndUpdate(recordId, updatedData);
    
        if (!updatedRecord) {
            return res.status(404).send('Record not found');
        }
    
        res.status(200).json({ message: 'Record updated successfully', record: updatedRecord });

    }catch{
        res.status(500).json({ msg: 'Server error' });
    }
});
module.exports = router;
