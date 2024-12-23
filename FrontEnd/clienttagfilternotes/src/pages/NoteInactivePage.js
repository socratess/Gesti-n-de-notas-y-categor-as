import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import noteService from "../services/noteService";


function NoteInactivePage(){


    const [noteInactive, setNoteInactive] = useState([])


    const loadingNoteInactive = async() => {
    
        try {
           const response = await noteService.getAllNotesInactive() 
           setNoteInactive(response.data)
           
        } catch (error) {
            console.log("Error to get the Archived Notes",error);
        }
    }

    useEffect(()=>{
        loadingNoteInactive()
    },[]) 

    return (
        <Container className="mt-3">
            <h1 style={{ textAlign: 'center'}}>Archived/Inctivated Notes</h1>  
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Content</th>
              <th>Archived</th>
              <th>Categories</th>
            </tr>
          </thead>
          <tbody>
            {noteInactive.map(note=> (
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

export default NoteInactivePage;