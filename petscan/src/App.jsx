
import './App.css'
import MyNavbar from './components/MyNavbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import BloodTestInfo from './components/BloodTestInfo';
import BloodTest from './components/BloodTest';
import Values from './components/Values';


function App() {

  return (
    <>
      <BrowserRouter>
        <div>
          <MyNavbar className="text-center" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Signup />} />
            <Route path="/bloodTests" element={<BloodTestInfo />} />
            <Route path="/results" element={<BloodTest />} />
            <Route path="/results/:bloodTestId/values" element={<Values />} />


          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App;
