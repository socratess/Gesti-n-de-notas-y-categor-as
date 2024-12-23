import {Button,Table} from 'react-bootstrap';
import { Container } from "react-bootstrap";

function NotesTable({notes, showDetail,handleShow,handleDelete}) {
  return (
    <Container className="mt-3">
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Content</th>
          <th>Status</th>
          <th>Categories</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {notes.map(note=> (
            <tr key={note.id} onClick={() => showDetail(note.id)}>
                <td>{note.id}</td>
                <td>{note.title}</td>
                <td>{note.content}</td>
                <td>{note.active ? 
              (<span style={{color:'green'}}>✔️ Unarchived/Activated</span>):
              (  <span style={{color:'red'}}>❌ Archived/Inactivated</span>) }
                </td>
                <td>{note.categories.join(", ")}</td>
                <td>
                    <Button variant='warning' onClick={e => {e.stopPropagation(); handleShow(note)}}>
                        Update
                    </Button>
                    {" "}
                    <Button variant='danger' onClick={e => {e.stopPropagation(); handleDelete(note.id)}}>
                        Delete
                    </Button>
                </td>

            </tr>
        ))}
      </tbody>
    </Table>
    </Container>
  );
}

export default NotesTable;