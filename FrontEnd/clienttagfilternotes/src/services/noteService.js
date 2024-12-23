import axios from "axios";

const API_URL= "http://localhost:8082/api/notes"

const getAllNotes = () => axios.get(API_URL);
const getNoteById = (id) => axios.get(`${API_URL}/${id}`);
const getAllNotesActive = () => axios.get(`${API_URL}/active`);
const getAllNotesInactive = () => axios.get(`${API_URL}/inactive`);
const createNote = (data) => axios.post(API_URL,data);
const updateNote = (id,data) => axios.put(`${API_URL}/${id}`,data);
const deleteNote = (id) => axios.delete(`${API_URL}/${id}`);

const noteService = {
    getAllNotes,
    getNoteById,
    getAllNotesActive,
    getAllNotesInactive,
    createNote,
    updateNote,
    deleteNote
}

export default noteService;