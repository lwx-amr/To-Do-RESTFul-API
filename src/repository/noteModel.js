import mongoose from 'mongoose';

const NoteSchema = mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

const noteModel = mongoose.model('note', NoteSchema);

module.exports = noteModel;
