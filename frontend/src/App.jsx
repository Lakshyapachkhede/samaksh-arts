import { useState } from 'react'
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Gallery from './pages/Gallery/Gallery';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>

      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/gallery' element={<Gallery />} />

        </Routes>


      </Router>




    </>
  )
}

export default App
