import mongoose, { Schema } from 'mongoose';

const NoteSchema = mongoose.Schema({
  userID: {
    type: Schema.Types.ObjectId,
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
