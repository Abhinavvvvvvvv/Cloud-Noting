import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

function Notes() {
  const context = useContext(noteContext);
  let navigate = useNavigate()
  const { notes, getNote, editNote } = context;

  useEffect(() => {
    if (localStorage.getItem('tokken')) {
      getNote();
    } else {
      navigate('/login')
    }
  }, []);

  const [note, setNote] = useState({
    id: "",
    Utitle: "",
    Udescription: "",
    Utag: "",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      Utitle: currentNote.title,
      Udescription: currentNote.description,
      Utag: currentNote.tag,
    });
  };
  const ref = useRef(null);
  const refClose = useRef(null);

  const handleClick = (e) => {
    editNote(note.id, note.Utitle, note.Udescription, note.Utag)
    refClose.current.click();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <AddNote />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {" "}
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Utitle"
                    name="Utitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    value={note.Utitle}
                    minLength={3}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Udescription"
                    name="Udescription"
                    onChange={onChange}
                    value={note.Udescription}
                    minLength={3}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Utag"
                    name="Utag"
                    onChange={onChange}
                    value={note.Utag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
                disabled= {note.Utitle.length<3 || note.Udescription.length<3}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Added Notes</h2>
        <div className="container">
          {notes.length===0 && "No notes added yet"}
        </div>
        {notes.map((notes, index) => {
          return <NoteItem key={index} updateNote={updateNote} notes={notes} />;
        })}
      </div>
    </>
  );
}

export default Notes;
