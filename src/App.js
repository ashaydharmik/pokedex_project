import React from 'react';
import Main from './Main';
import './Components/style.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Pokeinfo from './Pokeinfo';
import Favorite from './Favorite';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/pokeinfo/:id" element={<Pokeinfo />} />
        <Route path="/" element={<Favorite />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

































