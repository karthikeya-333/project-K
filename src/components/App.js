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
import Payment from "./Payment";
import Navbar from "./Navbar";
import Transactions from "./Transactions";
import AdminHome from "./AdminHome";
import AdminNav from "./AdminNav";
import Menu from "./Menu";
import AdminTransactions from "./AdminTransactions";



function App() {

  let history = useNavigate();
  useEffect(() => {
    if(!localStorage.getItem("token")){
      history("/login");
    }
  },[] )


  return (
    <Routes>
      <Route path="/" element={<><Navbar/><Home /></>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgotpass" element={<Forgotpass />} />
      <Route path="/payment" element={<><Navbar/><Payment /></>} />
      <Route path="/transactions" element={<><Navbar/><Transactions/></>} />
      <Route path="/admin" element={<><AdminNav/><AdminHome/></>} />
      <Route path="/admin/menu" element={<><AdminNav/><Menu/></>} />
      <Route path="/admin/transactions" element={<><AdminNav/><AdminTransactions/></>} />
      
    </Routes>
  );
}

export default App;
