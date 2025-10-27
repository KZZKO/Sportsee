import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Index } from './pages/dashboard/dashboard.jsx';
import './styles/style.css'


const App = () => (
  <div>
    <Routes>
      <Route path="/" element={<Index />} />
    </Routes>
  </div>
);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);