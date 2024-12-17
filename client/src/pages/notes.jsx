import { useState, useEffect } from 'react';
import { getNotes } from "../services/notesService.js";

export default function Notes() {
    const [notes, setNotes] = useState([]);
    useEffect(() => {
        setNotes(getNotes());
    }, []);


    return (
        <div>
            <h1>All Notes</h1>
            <ul>
                {notes.map((note) => (
                    <li key={note.id}>
                        {note.title}
                        - {note.createdTime}
                    </li>
                ))}
            </ul>

        </div>
    );
}