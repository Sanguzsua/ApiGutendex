import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './App.css'
import Home from './Componentes/Home'
import Favoritos from './Componentes/Favoritos'
import Informativo from './Componentes/Informativa'
import Original from './Componentes/Original'
import Detalle from './Componentes/Detalle'

function App() {
 return (
    <>
    <Router>
       <nav className="c-menu">
          <Link to="/">Home</Link>
          <Link to="/Informativo">Informativo</Link>
          <Link to="/Original">Mapa</Link>
          <Link to="/Favoritos">Favoritos</Link>
          <Link to="/Detalle">Detalle</Link>
        </nav>
    <Routes>
          <Route path="/" element={<Home /> } />
          <Route path="/Informativo" element={<Informativo /> } />
          <Route path="/Original" element={<Original /> } />
          <Route path="/Favoritos" element={<Favoritos /> } />
          <Route path="/Detalle/:categoria/:id" element={<Detalle />} />


      </Routes>
    </Router>
    </>
  )
}

export default App
