import { useState } from 'react';
import './App.css';
import Header from './pages/header';
import {Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/planning';
import Contact from './pages/contact';
import Start from './pages';


function App() {
    return (
        <div>
         <Header />
        
         <Routes>
         <Route path="/" element={<Navigate to="/" replace />} />
         <Route path='/index' element={<Start />} />
         <Route path='/planning' element={< Home />} />
         <Route path='/contact' element={< Contact />} />
         </Routes>
        </div>
    )
   
}

export default App
