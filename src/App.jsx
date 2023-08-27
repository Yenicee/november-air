import { useState } from 'react';
import './App.css';
import Header from './pages/header';
import {Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home';
import Uploadform from './pages/from';



function App() {
    return (
        <div>
         <Header />
        
         <Routes>
         <Route path="/" element={<Navigate to="/home" replace />} />
         <Route path='/home' element={< Home />} />
         <Route path='/form' element={< Uploadform />} />
         </Routes>
        </div>
    )
   
}

export default App
