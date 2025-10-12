import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./styles/App.css";
import "./styles/nav.css";
import { Navbar} from './components/Navbar'; 
import { Inicio } from './pages/inicio';
import { Login } from './pages/Login';
import { Register } from './pages/Register';


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Navbar />
        <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    </Router>
  )
}

export default App
