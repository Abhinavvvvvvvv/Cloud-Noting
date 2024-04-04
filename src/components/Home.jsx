import React from "react";
import Notes from "./Notes";
import AddNote from "./AddNote";

function Home(props) {
  const {showAlert} = props

  return (
    <div>
      <Notes showAlert={showAlert}/>
    </div>
  );
}

export default Home;
