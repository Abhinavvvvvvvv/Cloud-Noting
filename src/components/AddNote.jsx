import React, {useContext, useState} from "react";
import noteContext from "../context/notes/noteContext";
import Notes from "./Notes";

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({title: "", description:"", tag: ""})

    const handleAddNote = (e) => {
      e.preventDefault()
      addNote(note.title, note.description, note.tag);
      setNote({title: "", description:"", tag: ""})
    }


    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <>
      <div className="container my-3">
        <h2>Add a Note</h2>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
              value={note.title}
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
              id="description"
              name="description"
              onChange={onChange}
              value={note.description}
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
              id="tag"
              name="tag"
              onChange={onChange}
              value={note.tag}
              minLength={3}
              required
            />
          </div>
          <button disabled={note.title<3 || note.description<3} type="submit" className="btn btn-primary" onClick={handleAddNote}>
            Add Note
          </button>
        </form>
      </div>
    </>
  );
};

export default AddNote;
