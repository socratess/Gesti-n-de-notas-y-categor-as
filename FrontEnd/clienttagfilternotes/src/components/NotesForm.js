import {Button, Form} from 'react-bootstrap';

function NotesForm({note, setNote, errors, handleSave}) {
  
    const handlechange = (e) =>{
const {name, value} = e.target;
//const parsedValue = name === "active" ? value === "true" : value;
const parsedValue = name === "active" ? value === "true" : (name === "categories" ? value.split(",").map(cat => cat.trim()) : value);


setNote(prevState => ({...prevState, [name]: parsedValue}))
    }
  
    return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control 
            type="text"
            name="title" 
            placeholder="Title of the note"
            value={note.title}
            onChange={handlechange}
            isInvalid={!!errors.title}
            />
        <Form.Control.Feedback type='invalid'>
            {errors.title}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Content</Form.Label>
        <Form.Control 
            as="textarea"
            rows={10}
            name="content" 
            placeholder="Content of the note"
            value={note.content}
            onChange={handlechange}
            isInvalid={!!errors.content}
            />
        <Form.Control.Feedback type='invalid'>
            {errors.content}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Status</Form.Label>
        <Form.Select 
            name="active" 
            value={note.active}
            onChange={handlechange}
            isInvalid={!!errors.active}
            >
             <option value="">Select......</option>   
            <option value="true">Yes-Unarchive/Activate</option>
            <option value="false">No-Archive/Inctivate</option>
            </Form.Select>    
        <Form.Control.Feedback type='invalid'>
            {errors.active}
        </Form.Control.Feedback>
      </Form.Group>


      <Form.Group className="mb-3">
        <Form.Label>Categories</Form.Label>
        <Form.Control 
            type="text"
            name="categories" 
            placeholder="Categories of the note"
            value={note.categories}
            onChange={handlechange}
            isInvalid={!!errors.categories}
            />
        <Form.Control.Feedback type='invalid'>
            {errors.categories}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" onClick={() => handleSave()}>
        Save
      </Button>
    </Form>
  );
}

export default NotesForm;