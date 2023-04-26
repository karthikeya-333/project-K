import React, { createContext, useState } from "react";
import kContext from "./Context";



function State(props) {

  let array = [];
  const [transactions, setTransactions] = useState(array);
  let [valid, setValid] = useState(false);
  let [menu,setMenu]= useState([]);
  let [attendance,setAttendance]=useState([]);
  let [day,setDay]=useState(0);

  async function getTransactions() {
    const response = await fetch("http://localhost:5000/api/transaction/getTransactions", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")
      },
    });
    const json = await response.json();
    let alltransactions = json.transactions;
    setTransactions(alltransactions);
    let recentTransaction1 = json.transactions[json.transactions.length - 1];
    let recentTransaction2 = json.transactions[json.transactions.length - 2];
    
    let today = new Date();
    if (recentTransaction1) {
      let t1 = recentTransaction1.startDate
      let t2 = recentTransaction1.endDate;
      t1 = new Date(t1);
      t2 = new Date(t2);
      if (t1.getTime() <= today.getTime() && t2.getTime() >= today.getTime()) {
        setValid(true);
        setAttendance(recentTransaction1.attendance);
        setDay(today.getDay()-t1.getDay());
      }
    }
     if (recentTransaction2) {
      let t3 = recentTransaction2.startDate;
      let t4 = recentTransaction2.endDate;
      t3 = new Date(t3);
      t4 = new Date(t4);
      if (t3.getTime() <= today.getTime() && t4.getTime() >= today.getTime()) {
        setValid(true);
        setAttendance(recentTransaction1.attendance);
        setDay(today.getDay()-t3.getDay());
      }
    }
  }

  async function getMenu(session){

    const response = await fetch("http://localhost:5000/api/session/getMenu", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")
      },
      body: JSON.stringify({session})
    });
    const json = await response.json();
    //console.log(json);
    setMenu(json.menu);

  }




  return (
    <kContext.Provider value={{ getTransactions, transactions, valid,menu,getMenu,attendance,day}}>
      {props.children}

    </kContext.Provider>
  )
}

export default State;
