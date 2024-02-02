import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) =>{
    const notesInitialState = [
        {
          "_id": "65bb99332950195f49d1b9e0",
          "user": "65ba42177a9262fc02aaf219",
          "title": "My Title",
          "description": "Do what it feels like",
          "tag": "Personal",
          "date": "2024-02-01T13:14:27.280Z",
          "__v": 0
        },
        {
          "_id": "65bb9a332950195f49d1b9e2",
          "user": "65ba42177a9262fc02aaf219",
          "title": "My Title",
          "description": "Do what it feels like",
          "tag": "Personal",
          "date": "2024-02-01T13:18:43.622Z",
          "__v": 0
        },
        {
          "_id": "65bb99332950195f49d1b9e0",
          "user": "65ba42177a9262fc02aaf219",
          "title": "My Title",
          "description": "Do what it feels like",
          "tag": "Personal",
          "date": "2024-02-01T13:14:27.280Z",
          "__v": 0
        },
        {
          "_id": "65bb9a332950195f49d1b9e2",
          "user": "65ba42177a9262fc02aaf219",
          "title": "My Title",
          "description": "Do what it feels like",
          "tag": "Personal",
          "date": "2024-02-01T13:18:43.622Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(notesInitialState)

    return(
        <noteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState