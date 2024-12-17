import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NoteService from '../services/NoteService';

function NoteDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        const notes = NoteService.getNotes();
        const foundNote = notes.find((n) => n.id === id);
        if (foundNote) {
            setNote(foundNote);
            setTitle(foundNote.title);
            setContent(foundNote.content);
        } else {
            alert('Note not found!');
            navigate('/');
        }
    }, [id, navigate]);

    const handleSave = () => {
        NoteService.updateNote(id, { title, content });
        setNote({ ...note, title, content });
        setIsEditing(false);
    };

    const handleDelete = () => {
        NoteService.deleteNote(id);
        navigate('/'); // Redirect to notes list after deleting
    };

    if (!note) return <p>Loading...</p>;

    return (
        <div>
            <h1>Note Details</h1>
            {isEditing ? (
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label>Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setIsEditing(false)} style={{ marginLeft: '10px' }}>
                        Cancel
                    </button>
                </div>
            ) : (
                <div>
                    <h3>{note.title}</h3>
                    <p>Created At: {new Date(note.createdTime).toLocaleString()}</p>
                    <p>{note.content}</p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}

export default NoteDetails;