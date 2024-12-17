import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotesList from "./pages/NotesList.jsx";
import NoteDetails from './pages/NoteDetails';
import Login from './pages/Login';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/notes" element={<NotesList />} />
                <Route path="/notes/:id" element={<NoteDetails />} />
            </Routes>
        </Router>
    );
}

export default App;