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
    const [errors, setErrors] = useState({ title: '', content: '' });

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

    const validateFields = () => {
        const newErrors = { title: '', content: '' };

        if (title.length > 50) {
            newErrors.title = 'Title cannot exceed 50 characters.';
        }

        if (content.length > 200) {
            newErrors.content = 'Content cannot exceed 200 characters.';
        }

        setErrors(newErrors);

        // Return true if no errors
        return !newErrors.title && !newErrors.content;
    };

    const handleSave = () => {
        if (validateFields()) {
            NoteService.updateNote(id, { title, content });
            setNote({ ...note, title, content });
            setIsEditing(false);
        }
    };

    const handleDelete = () => {
        NoteService.deleteNote(id);
        navigate('/'); // Redirect to notes list after deleting
    };

    if (!note) return <p>Loading...</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>Note Details</h1>
            {isEditing ? (
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength="50"
                        style={{ display: 'block', marginBottom: '10px' }}
                    />
                    {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>}

                    <label>Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        maxLength="200"
                        rows="4"
                        style={{ display: 'block', marginBottom: '10px' }}
                    />
                    {errors.content && <p style={{ color: 'red' }}>{errors.content}</p>}

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
                    <button onClick={handleDelete} style={{ marginLeft: '10px', color: 'red' }}>
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}

export default NoteDetails;