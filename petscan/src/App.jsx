
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
import Disease from './components/Disease';
import UserOptions from './components/UserOptions';
import AddPet from './components/AddPet';
import Pets from './components/Pets';
import PetsBloodTests from './components/PetsBloodTests';
import SelectedBloodTestResults from './components/SelectedBloodTestResults';
import UpdatePet from './components/UpdatePet';
import AboutUs from './components/AboutUs';
import MyFooter from './components/MyFooter';


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
            <Route path="/disease/:diseaseId" element={<Disease />} />
            <Route path="/options" element={<UserOptions />} />
            <Route path="/add-pet" element={<AddPet />} />
            <Route path="/pets" element={<Pets />} />
            <Route path="/bloodTests/:petId" element={<PetsBloodTests />} />
            <Route path="/bloodTest/results/:bloodTestId" element={<SelectedBloodTestResults />} />
            <Route path="/pets/:petId" element={<UpdatePet />} />
            <Route path="/aboutUs" element={<AboutUs />} />
          </Routes>
          <MyFooter />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App;
