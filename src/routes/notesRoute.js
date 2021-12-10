/* eslint-disable import/named */
import { Router } from 'express';

import {
  getAllUserNotes, addNewNote, getNote, updateNote, deleteNote, invalidRequest,
} from '../controllers/noteController';

const router = Router();

// Crud operations for note
router.route('/note/:id')
  .get(getNote)
  .delete(deleteNote)
  .put(updateNote);

router.route('/note')
  .post(addNewNote);

// Return all notes for certain user
router.route('/:id/note')
  .get(getAllUserNotes);

// catch all other routes
router.route('*')
  .get(invalidRequest);

export default router;
