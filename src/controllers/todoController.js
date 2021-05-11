import NoteModel from '../repository/noteModel';

// Display all notes in workspace from recent to old
const getAllUserNotes = (req, res) => {
  NoteModel.find({ userID: req.params.id }).sort({ created_date: -1 }) // by recent
    .then((results) => res.json(results))
    .catch((err) => res.status(404).json(err));
};

// Crud operations for note
const addNewNote = (req, res) => {
  const newNote = NoteModel(req.body);
  newNote.save()
    .then((note) => res.json(note))
    .catch((err) => res.status(400).json(err));
};

const getNote = (req, res) => {
  NoteModel.findById(req.params.id)
    .then((note) => res.json(note))
    .catch((err) => res.status(400).json(err));
};

const updateNote = (req, res) => {
  NoteModel.findByIdAndUpdate(req.body.id, req.body)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
};

const deleteNote = (req, res) => {
  NoteModel.deleteOne({ _id: req.params.id })
    .then((result) => res.json(result))
    .catch((err) => res.status(404).json(err));
};

// Handling all not found requests
const invalidRequest = (req, res) => {
  res.send('<h1>PAGE NOT FOUND</h1>');
};

module.exports = {
  getAllUserNotes,
  addNewNote,
  getNote,
  updateNote,
  deleteNote,
  invalidRequest,
};
