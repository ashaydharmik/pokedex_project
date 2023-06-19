import React from 'react';
import Main from './Components/Main';
import './Components/style.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Pokeinfo from './Components/Pokeinfo';
import Favorite from './Components/Favorite';

function app() {
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

export default app;

































