import {useState, useEffect} from "react";
import api from "../api";
import Note from "../components/Note";
import { Navigate } from 'react-router-dom';
import "../styles/Home.css";
import "../styles/Form.css";

const Home = () => {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [isLoggedOut, setIsLoggedOut] = useState(false);

    useEffect(() => {
        getNotes();
    }, [])

    const getNotes = () => {
        api.get("/api/notes/")
        .then((res) => res.data)
        .then((data) => {setNotes(data); console.log(data)})
        .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}/`).then((res) => {
            if (res.status === 204) alert("Note successfully deleted ")  //204 = successful deletion
            else alert("Failed to delete note")
            getNotes(); //Shows updated notes
        }).catch((err) => alert(err))
    };

    const createNote = (e) => {
        e.preventDefault();
        api.post("/api/notes/", {content, title}).then((res) => {
            if(res.status === 201) alert("Note successfully created")
            else alert("Failed to create note")
            getNotes();
        }).catch((err) => alert(err))
    };

    const Logout = () => {
        localStorage.clear();
        setIsLoggedOut(true);
    };

    if (isLoggedOut) {
        return <Navigate to='/login' />;
    }

    return (
    <div>Home
        <div>
            <h2>Notes</h2>
            {notes.map((note) => <Note note={note} onDelete={deleteNote} key={note.id}/>)} 
        </div>
        <h2>Create a Note</h2>
        <form onSubmit={createNote}>
            <label htmlFor="title">Title:</label><br/>
            <input 
                type="text" 
                id="title" 
                name="title"
                required 
                onChange={(e) => setTitle(e.target.value)} 
                value={title} 
            />
            <label htmlFor="content">Content:</label><br/>
            <textarea 
                id="content" 
                name="content"
                required 
                value={content}
                onChange={(e) => setContent(e.target.value)} 
            /><br/>
            <input type="submit" value="Submit"></input>
            <button onClick={Logout}>Logout</button>
        </form>
    </div>
    )
};

export default Home;