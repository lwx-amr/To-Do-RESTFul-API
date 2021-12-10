import debug from 'debug';

import NoteModel from '../repository/noteModel';

const notesLogger = debug('app:notes');

// Display all notes in workspace from recent to old
const getAllUserNotes = (req, res) => {
  NoteModel.find({ userID: req.params.id }).sort({ created_date: -1 }) // by recent
    .then((results) => res.json(results))
    .catch((err) => {
      notesLogger(err);
      res.status(400).json({ msg: 'Bad request' });
    });
};

// Crud operations for note
const addNewNote = (req, res) => {
  const newNote = NoteModel(req.body);
  newNote.save()
    .then((note) => res.json(note))
    .catch((err) => {
      notesLogger(err);
      res.status(400).json({ msg: 'Bad request' });
    });
};

const getNote = (req, res) => {
  NoteModel.findById(req.params.id)
    .then((note) => res.json(note))
    .catch((err) => {
      notesLogger(err);
      res.status(400).json({ msg: 'Bad request' });
    });
};

const updateNote = (req, res) => {
  NoteModel.findByIdAndUpdate(req.params.id, req.body)
    .then((data) => res.json(data))
    .catch((err) => {
      notesLogger(err);
      res.status(400).json({ msg: 'Bad request' });
    });
};

const deleteNote = (req, res) => {
  NoteModel.deleteOne({ _id: req.params.id })
    .then((result) => res.json(result))
    .catch((err) => {
      notesLogger(err);
      res.status(400).json({ msg: 'Bad request' });
    });
};

// Handling all not found requests
const invalidRequest = (req, res) => {
  res.status(404).json({ msg: 'Request not found' });
};

module.exports = {
  getAllUserNotes,
  addNewNote,
  getNote,
  updateNote,
  deleteNote,
  invalidRequest,
};
