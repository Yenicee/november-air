
import './App.css';
import Header from './pages/header';
import {Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/planning';
import Contact from './pages/contact';
import Start from './pages';
import PageC150l from './pages/subPagesAircraft/pageC150L';
import PageC182T from './pages/subPagesAircraft/pageC182T';


function App() {
    return (
        <div>
        <Header />
       
        <Routes>
            <Route path="/" element={<Navigate to="/" replace />} />
            <Route path='/index' element={<Start />} />
            <Route path='/planning' element={<Home />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/avion/C150L' element={<PageC150l />} /> 
            <Route path='/avion/C182T' element={<PageC182T />} /> 
        </Routes>
       </div>
   )
}

export default App;
