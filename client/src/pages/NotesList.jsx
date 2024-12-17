import { useState, useEffect } from "react";
import NoteService from "../services/NoteService.js";
import { Link } from "react-router-dom";
import NoteModal from "../components/NoteModal";
import withAuth from '../components/withAuth';
import { useNavigate } from 'react-router-dom';

function NotesList() {
    const [notes, setNotes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newNoteTitle, setNewNoteTitle] = useState("");
    const [newNoteContent, setNewNoteContent] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setNotes(NoteService.getNotes());
    }, []);

    const addNote = () => {
        NoteService.addNote(newNoteTitle, newNoteContent);
        setNotes(NoteService.getNotes());
        setNewNoteTitle("");
        setNewNoteContent("");
        setShowModal(false);
        navigate('/notes');
    };

    const toggleModal = () => setShowModal(!showModal);

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">All Notes</h1>
            {/* Add Note Button */}
            <div className="text-end mb-3">
                <button className="btn btn-primary" onClick={toggleModal}>
                    Add New Note
                </button>
            </div>

            {/* Notes List */}
            {notes.length === 0 ? (
                <div className="alert alert-info text-center">No notes available. Add one!</div>
            ) : (
                <div className="list-group">
                    {notes.map((note) => (
                        <Link
                            key={note.id}
                            to={`/notes/${note.id}`}
                            className="list-group-item list-group-item-action"
                        >
                            <h5 className="mb-1">{note.title}</h5>
                            <small className="text-muted">
                                Created At: {new Date(note.createdTime).toLocaleString()}
                            </small>
                        </Link>
                    ))}
                </div>
            )}

            {/* Note Modal Component */}
            <NoteModal
                showModal={showModal}
                toggleModal={toggleModal}
                newNoteTitle={newNoteTitle}
                setNewNoteTitle={setNewNoteTitle}
                newNoteContent={newNoteContent}
                setNewNoteContent={setNewNoteContent}
                addNote={addNote}
            />
        </div>
    );
}
export default withAuth(NotesList);
