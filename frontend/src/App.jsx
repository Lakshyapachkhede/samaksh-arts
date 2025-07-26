import { useState } from 'react'
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Gallery from './pages/Gallery/Gallery';
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Contact from './pages/Contact/Contact';
import { AdminLogin } from './pages/Admin/AdminLogin';
import ProtectedRoute from './components/protectedRoute';
import Admin from './pages/Admin/Admin';
import Paintings from './pages/Admin/Paintings';
import Contacts from './pages/Admin/Contacts';
import ManageKit from './pages/Admin/ManageKit';
import AddOrUpdatePainting from './pages/Admin/AddOrUpdatePainting';

function App() {
  return (
    <>

      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/admin/login' element={<AdminLogin />} />


          <Route path='/admin' element={<ProtectedRoute />}>
            <Route element={<Admin />}>
            <Route index element={<Navigate to="paintings" replace/>} />

              <Route path="paintings" element={<Paintings />} />
              <Route path='paintings/form' element={<AddOrUpdatePainting />} />


              <Route path="manage-kit" element={<ManageKit />} />
              <Route path="contacts" element={<Contacts />} />
            </Route>



          </Route>




        </Routes>


      </Router>




    </>
  )
}

export default App
