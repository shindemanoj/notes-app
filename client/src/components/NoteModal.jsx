import React from "react";
import withAuth from "./withAuth.jsx";

function NoteModal({
                                      showModal,
                                      toggleModal,
                                      newNoteTitle,
                                      setNewNoteTitle,
                                      newNoteContent,
                                      setNewNoteContent,
                                      addNote,
                                  }) {
    if (!showModal) return null; // Don't render if modal is hidden

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newNoteTitle && newNoteContent) {
            addNote(); // Call addNote function if fields are not empty
        }
    };

    return (
        <div
            className="modal show d-block"
            tabIndex="-1"
            role="dialog"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add New Note</h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={toggleModal}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter note title"
                                    value={newNoteTitle}
                                    onChange={(e) => setNewNoteTitle(e.target.value)}
                                    maxLength="50"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Content</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    placeholder="Enter note content"
                                    value={newNoteContent}
                                    onChange={(e) => setNewNoteContent(e.target.value)}
                                    maxLength="200"
                                    required
                                ></textarea>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary" type="submit">
                                    Add
                                </button>
                                <button className="btn btn-secondary" onClick={toggleModal}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withAuth(NoteModal);