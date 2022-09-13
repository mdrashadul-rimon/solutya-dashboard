import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from './Components/Home';
import Login from './Components/Login/Login';
import RequireAuth from './Components/Login/RequireAuth';
import SignUp from './Components/Login/SignUp';
import Navbar from './Components/Navbar';
import Products from './Components/Products';


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="products" element={<RequireAuth><Products /></RequireAuth>} /> 
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
