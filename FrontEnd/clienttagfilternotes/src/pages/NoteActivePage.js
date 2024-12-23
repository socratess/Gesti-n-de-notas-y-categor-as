import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import noteService from "../services/noteService";


function NoteActivePage(){


    const [noteActive, setNoteActive] = useState([])


    const loadingNoteActive = async() => {
    
        try {
           const response = await noteService.getAllNotesActive() 
           setNoteActive(response.data)
           
        } catch (error) {
            console.log("Error to get the Inarchived Notes",error);
        }
    }

    useEffect(()=>{
        loadingNoteActive()
    },[]) 

    return (
        <Container className="mt-3">
            <h1 style={{ textAlign: 'center'}}>Unarchived/Activated Notes</h1>      
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Content</th>
              <th>Status</th>
              <th>Categories</th>
            </tr>
          </thead>
          <tbody>
            {noteActive.map(note=> (
                <tr>
                    <td>{note.id}</td>
                    <td>{note.title}</td>
                    <td>{note.content}</td>
                    <td>{note.active ? 
                         (<span style={{color:'green'}}>✔️ Unarchived/Activated</span>):
                         (  <span style={{color:'red'}}>❌ Archived/Inactivated</span>) }
                    </td>
                    <td>{note.categories.join(", ")}</td>
                </tr>
            ))}
          </tbody>
        </Table>
        </Container>
      );



}

export default NoteActivePage;