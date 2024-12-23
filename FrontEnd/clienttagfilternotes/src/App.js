import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AppNavbar from './layouts/AppNavbar';
import NotePage from './pages/NotePage';
import CategoryPage from './pages/CategoryPage';
import NoteActivePage from './pages/NoteActivePage';
import NoteInactivePage from './pages/NoteInactivePage';

function App() {
  return (
 <Router>
<AppNavbar/>
<Container>
  <Routes>
  <Route path='/' element={<NotePage/>}/>
  <Route path='/active' element={<NoteActivePage/>}/>
  <Route path='/inactive' element={<NoteInactivePage/>}/>
  <Route path='/categories' element={<CategoryPage/>}/>
  </Routes>
</Container>
 </Router>
  );
}

export default App;

 