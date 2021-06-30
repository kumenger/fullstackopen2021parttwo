import React,{useState} from "react";
import Notes from './components/Notes'
const App=({note})=>{

  const [notes, setNotes] = useState([])
  const addNote=(event)=>{
    event.preventDefault()
    console.log('button clicked',event.target)
  }
  return (
    <div>
    <h1>Notes</h1>
    <ul>
      {note.map(note => 
        <Notes key={note.id} notes={note}   />
      )}
    </ul>
    <form onSubmit={addNote}>
      <input/>
      <button type='submit'>save</button>
    </form>
  </div>
  )
}
export default App