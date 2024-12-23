import { Button, Container, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import Table from 'react-bootstrap/Table';
import categoryService from "../services/categoryService";
import ModalConfirmation from "../components/ModalConfirmation";
//import ConfirmacionModal from "../components/ConfirmacionModal";
//import AreasCriticasForm from "../components/AreasCriticasForm";
//import AreasCriticasTable from "../components/AreasCriticasTable";
//import areasCriticasService from "../services/areasCriticasService";

function CategoryPage() {
    

    const [category, setCategory] = useState([])

    //const [notes, setNotes] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const [categoryIdDelete, setCategoryIdDelete] = useState(null);
   // const [selectNote, setSelectNote] = useState({title:"", content:"", active:"", categories:""});
    const [errors, setErrors] = useState({});
    const navigate= useNavigate()




    const loadingCategory = async() => {
    
        try {
           const response = await categoryService.getAllCategories() 
           setCategory(response.data)
           
        } catch (error) {
            console.log("Error to get the categories",error);
        }
    }

    useEffect(()=>{
        loadingCategory()
    },[]) 

    const handleDelete = (id) => {
        setCategoryIdDelete(id)
        setShowModalConfirm(true)
        };
        const handleClose = () => {

            setShowModal(false)
        
        };


        const eliminationConfirm = async () => {
            try {
                await categoryService.deleteCategory(categoryIdDelete)
                loadingCategory()
            } catch (error) {
                console.log("Error to delete the category", error)
            }
            
            setShowModalConfirm(false)
                }


    return (



        
        <Container className="mt-3">
            <h1 style={{ textAlign: 'center'}}>Categories</h1>      
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Notes</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {category.map(categ=> (
                <tr>
                    <td>{categ.id}</td>
                    <td>{categ.name}</td>
                    <td>{categ.notes.join(", ")}</td>
                    <td>
                    <Button variant='danger' onClick={e => {e.stopPropagation(); handleDelete(categ.id)}}>
                        Delete
                    </Button>
                </td>
                </tr>
            ))}
          </tbody>
        </Table>

        <ModalConfirmation 
                        showModalConfirm={showModalConfirm}
                        handleClose = {() => setShowModalConfirm(false)}
                        handleConfirm = {eliminationConfirm}
                        message= "¿Are you sure that you want to delete this category?"
                        />
        </Container>
      );


    
}


export default CategoryPage;