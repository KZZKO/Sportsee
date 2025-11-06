import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Index } from './pages/home/home.jsx';
import './styles/style.css'


const App = () => (
  <>
    <Routes>
      <Route path="/" element={<Index />} />
    </Routes>
  </>
);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);