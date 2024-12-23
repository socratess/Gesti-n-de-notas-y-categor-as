import { Button, Container, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import noteService from "../services/noteService";
import ModalConfirmation from "../components/ModalConfirmation";
import NotesForm from "../components/NotesForm";
import NotesTable from "../components/NotesTable";


function NotePage() {
    
    const [notes, setNotes] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const [noteIdDelete, setNoteIdDelete] = useState(null);
    const [selectNote, setSelectNote] = useState({title:"", content:"", active:"", categories:""});
    const [errors, setErrors] = useState({});
    const navigate= useNavigate()


    const loadingNotes = async() => {

try{
    const response = await noteService.getAllNotes()
    setNotes(response.data)

}
catch(error){
    console.log("Error getting the notes", error);
}

    }

    useEffect(()=>{
        loadingNotes()
    },[]) 

    const showDetail=(id)=>{
        navigate(`/notes/${id}`)
        };

        const handleShow = (note ={title:"", content:"", active:true, categories:[]}) => {
            setSelectNote({
                ...note,
                active: note.active === undefined ? true : note.active,
                categories: Array.isArray(note.categories) ? note.categories:[]
            })
            setErrors({})
            setShowModal(true)
        };

        const handleDelete = (id) => {
            setNoteIdDelete(id)
            setShowModalConfirm(true)
            };

            const handleClose = () => {

                setShowModal(false)
            
            };

            const eliminationConfirm = async () => {
                try {
                    await noteService.deleteNote(noteIdDelete)
                    loadingNotes()
                } catch (error) {
                    console.log("Error to delete the note", error)
                }
                
                setShowModalConfirm(false)
                    }

                    const handleSave = async () => {

                        if(!validateForm()){
                return 
                        }
const noteToSave = {
    ...selectNote, categories: Array.isArray(selectNote.categories) ? selectNote.categories:[]
}

console.log("Note to save:", noteToSave);

                        try {
                            if(noteToSave.id){
                await noteService.updateNote(noteToSave.id, noteToSave)
                            }
                            else{
                                await noteService.createNote(noteToSave)
                            }
                            loadingNotes()
                
                        } catch (error) {
                            console.log("Error to save the note",error)
                        }
                        setShowModal(false)
                    };


                    const validateForm = () => {
                        const newErrores = {}
                        
                            if(selectNote.title.length < 4 || selectNote.title.length >100 ){
                                newErrores.title = "the title should be between 4 and 100 characters"
                            };
                        
                            if(selectNote.content.length < 4 || selectNote.content.length >1500 ){
                                newErrores.nombre = "the contento should be between 4 and 1500 characters"
                        };
                        setErrors(newErrores)
                        return Object.keys(newErrores).length === 0
                            }



                            return (
                                <Container className="mt-3">
                                    <h1 style={{ textAlign: 'center'}}>All Notes</h1>
                        
                        <Button variant="primary"  onClick={() => handleShow()}>Create Note</Button>
                        {" "}
                        

                                    <NotesTable 
                                    notes = {notes}
                                    showDetail={showDetail}
                                    handleShow={handleShow}
                                    handleDelete={handleDelete}
                                    />
                        
                        <ModalConfirmation 
                        showModalConfirm={showModalConfirm}
                        handleClose = {() => setShowModalConfirm(false)}
                        handleConfirm = {eliminationConfirm}
                        message= "¿Are you sure that you want to delete this note?"
                        />
                        
                        
                        
                        <Modal show={showModal} onHide={handleClose}>
                                <Modal.Header closeButton>
                                  <Modal.Title>{selectNote.id ? "Edit note": "Create note"}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>

                                    <NotesForm 
                                    note ={selectNote}
                                    setNote = {setSelectNote}
                                    errors={errors}
                                    handleSave={handleSave}
                                    />
                                </Modal.Body>
                              </Modal>
                        
                                    </Container>
                            )                           

}


export default NotePage;