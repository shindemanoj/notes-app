import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NoteService from '../services/NoteService';
import withAuth from '../components/withAuth';

function NoteDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState({ title: '', content: '', note: '' });

    useEffect(() => {
        const notes = NoteService.getNotes();
        const foundNote = notes.find((n) => n.id === id);
        if (foundNote) {
            setNote(foundNote);
            setTitle(foundNote.title);
            setContent(foundNote.content);
        } else {
            const newErrors = { title: '', content: '', note:'' };
            newErrors.note = 'Note not found';    // removing alert, adding to error
            setErrors(newErrors);
            navigate('/');
        }
    }, [id, navigate]);

    const validateFields = () => {
        const newErrors = { title: '', content: '', note:'' };

        if (title.length > 50) {
            newErrors.title = 'Title cannot exceed 50 characters.';
        }

        if (content.length > 200) {
            newErrors.content = 'Content cannot exceed 200 characters.';
        }

        setErrors(newErrors);

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
        navigate('/');
    };

    if (!note) return <p>Loading...</p>;

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Note Details</h1>
            {errors.note && <div className="alert alert-danger">{errors.note}</div>}
            {isEditing ? (
                <div className="card p-4">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleSave();
                    }}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                                Title
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                maxLength="50"
                                required
                            />
                            {errors.title && <div className="text-danger">{errors.title}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="content" className="form-label">
                                Content
                            </label>
                            <textarea
                                className="form-control"
                                id="content"
                                rows="4"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                maxLength="200"
                                required
                            ></textarea>
                            {errors.content && <div className="text-danger">{errors.content}</div>}
                        </div>

                        <button type="submit" className="btn btn-primary me-2">
                            Save
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                            Cancel
                        </button>
                    </form>
                </div>
            ) : (
                <div className="card p-4">
                    <h3>{note.title}</h3>
                    <p className="text-muted">Created At: {new Date(note.createdTime).toLocaleString()}</p>
                    <p>{note.content}</p>

                    <button className="btn btn-warning mb-2" onClick={() => setIsEditing(true)}>
                        Edit
                    </button>
                    <button className="btn btn-danger" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}

export default withAuth(NoteDetails);