import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import Home from "./Home";
import { useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Forgotpass from "./Forgotpass";



function App() {

  let history = useNavigate();
  useEffect(() => {
    if(!localStorage.getItem("token")){
      history("/login");
    }
  },[] )


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgotpass" element={<Forgotpass />} />
      
    </Routes>
  );
}

export default App;
