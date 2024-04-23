import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Create from './components/Create';
import Read from './components/Read';
import Update from './components/Update';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Create />} />
        <Route exact path='/all' element={<Read />} />
        <Route exact path='/update' element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}
  
export default App;
