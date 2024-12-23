import axios from "axios";

const API_URL= "http://localhost:8082/api/categories"

const getAllCategories = () => axios.get(API_URL);
const createCategory = (data) => axios.post(API_URL,data);
const deleteCategory = (id) => axios.delete(`${API_URL}/${id}`)

const categoryService = {
    getAllCategories,
    createCategory,
    deleteCategory
}

export default categoryService;