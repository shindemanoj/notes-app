import { useState, useEffect } from 'react';
import NoteService from "../services/NoteService.js";

export default function NotesList() {
    const [notes, setNotes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newNoteTitle, setNewNoteTitle] = useState('');
    const [newNoteContent, setNewNoteContent] = useState('');

    useEffect(() => {
        setNotes(NoteService.getNotes());
    }, []);

    const addNote = (newNote) => {
        NoteService.addNote(newNoteTitle, newNoteContent);
        setNotes(NoteService.getNotes());
        setNewNoteTitle('');
        setNewNoteContent('');
        setShowModal(false);
    };

    const toggleModal = () => setShowModal(!showModal);

    return (
        <div>
            <h1>All Notes</h1>
            <button onClick={toggleModal}>Add New Note</button>
            <ul>
                {notes.map((note) => (
                    <li key={note.id}>
                        <strong>{note.title}</strong> - {note.createdTime}
                    </li>
                ))}
            </ul>

            {showModal && (
                <div>
                    <div>
                        <h3>Add New Note</h3>
                        <input
                            type="text"
                            placeholder="Title"
                            value={newNoteTitle}
                            onChange={(e) => setNewNoteTitle(e.target.value)}
                        />
                        <textarea
                            placeholder="Content"
                            value={newNoteContent}
                            onChange={(e) => setNewNoteContent(e.target.value)}
                        />
                        <button onClick={addNote}>Add</button>
                        <button onClick={toggleModal}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}