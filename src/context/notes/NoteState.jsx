import { json } from "react-router-dom";
import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get all notes
  const getNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-tokken":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViYTQyMTc3YTkyNjJmYzAyYWFmMjE5In0sImlhdCI6MTcwNjc4NDQxN30.8q-6GIsMvkrISj2JnQtLOmbKK8Avm6gLWnHu3Udkp9Y",
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-tokken":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViYTQyMTc3YTkyNjJmYzAyYWFmMjE5In0sImlhdCI6MTcwNjc4NDQxN30.8q-6GIsMvkrISj2JnQtLOmbKK8Avm6gLWnHu3Udkp9Y",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    // Client side displaying
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // Delete a Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-tokken":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViYTQyMTc3YTkyNjJmYzAyYWFmMjE5In0sImlhdCI6MTcwNjc4NDQxN30.8q-6GIsMvkrISj2JnQtLOmbKK8Avm6gLWnHu3Udkp9Y",
      },
    });
    const json = response.json();
    const newNotes = notes.filter((notes) => notes._id !== id);
    setNotes(newNotes);
  };

  // Edit the note
  // API call
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-tokken":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViYTQyMTc3YTkyNjJmYzAyYWFmMjE5In0sImlhdCI6MTcwNjc4NDQxN30.8q-6GIsMvkrISj2JnQtLOmbKK8Avm6gLWnHu3Udkp9Y",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes))


    // Logic to edit in Client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  };

  return (
    <noteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNote }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
