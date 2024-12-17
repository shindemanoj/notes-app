import { v4 as uuidv4 } from 'uuid';

const NOTES_KEY = 'notes';

const notes =
    JSON.stringify([
        {
            id: 'uuid-1',
            title: 'First Note',
            content: 'Content of the first note.',
            createdTime: new Date().toISOString(),
        },
        {
            id: 'uuid-2',
            title: 'Second Note',
            content: 'Content of the second note.',
            createdTime: new Date().toISOString(),
        },
    ]);

const NoteService = {
    getNotes: () => {
        const notes = JSON.parse(localStorage.getItem(NOTES_KEY)) || [];
        return notes;
    },

    addNote: (title, content) => {
        const notes = NoteService.getNotes();

        const newNote = {
            id: uuidv4(),  // Generate unique UUID
            title,
            content,
            createdTime: new Date().toISOString(),
        };

        notes.push(newNote);
        localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    },

    updateNote: (id, updatedData) => {
        const notes = NoteService.getNotes();
        const updatedNotes = notes.map((note) =>
            note.id === id ? { ...note, ...updatedData } : note
        );
        localStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes));
    },

    deleteNote: (id) => {
        const notes = NoteService.getNotes();
        const filteredNotes = notes.filter((note) => note.id !== id);
        localStorage.setItem(NOTES_KEY, JSON.stringify(filteredNotes));
    },
};

export default NoteService;