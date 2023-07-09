import React, { createContext, useState } from "react";
import kContext from "./Context";

function dateDiffInDays(a, b) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}



function State(props) {

  let array = [];
  const [transactions, setTransactions] = useState(array);
  const [allTransactions, setAllTransactions] = useState([]);
  let [valid, setValid] = useState(false);
  let [menu, setMenu] = useState([[],[],[]]);
  let [menu1, setMenu1] = useState([]);
  let [attendance, setAttendance] = useState([]);
  let [day, setDay] = useState(0);

  async function getTransactions() {
    const response = await fetch("http://localhost:5000/api/transaction/getTransactions", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")
      },
    });
    const json = await response.json();
    let alltransactions1 = json.transactions;
    setTransactions(alltransactions1.reverse());
    let recentTransaction1 = json.transactions[0];
    let recentTransaction2 = json.transactions[1];

    let today = new Date();
    if (recentTransaction1) {
      let t1 = recentTransaction1.startDate
      let t2 = recentTransaction1.endDate;
      t1 = new Date(t1);
      t2 = new Date(t2);
      if (t1.getTime() <= today.getTime() && t2.getTime() >= today.getTime()) {
        setValid(true);
        setAttendance(recentTransaction1.attendance);
        setDay(dateDiffInDays(t1,today)  );
      }
    }
    if (recentTransaction2) {
      let t3 = recentTransaction2.startDate;
      let t4 = recentTransaction2.endDate;
      t3 = new Date(t3);
      t4 = new Date(t4);
      if (t3.getTime() <= today.getTime() && t4.getTime() >= today.getTime()) {
        setValid(true);
        setAttendance(recentTransaction2.attendance);
        setDay(dateDiffInDays(t3,today)  );
      }
    }
  }


  async function getAllTransactions(){
    const response = await fetch("http://localhost:5000/api/transaction/getAllTransactions", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")
      },
    });
    let json=await response.json();
    setAllTransactions(json.transactions.reverse());
  }





  async function getMenu(session) {

    const response = await fetch("http://localhost:5000/api/session/getMenu", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({"session":session})
    });
    const json = await response.json();
    console.log(json);
    if(json.msg=="avaliable"){
      menu[session-1]=[];
      menu[session-1]=json.menu.menu;
      setMenu(menu);
      setMenu1(json.menu.menu);
    }
    else{
      setMenu(menu);
      setMenu1([]);
    }
    
  }

  async function addMenu(session){
    const response = await fetch("http://localhost:5000/api/session/addMenu", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({session,"menu":menu1}),
    });
    let json=await response.json();
    console.log(json);
    setMenu1(json.menu);
  }




  return (
    <kContext.Provider value={{ getTransactions,getAllTransactions,allTransactions, transactions, valid, menu, setMenu, getMenu, attendance, day,addMenu,menu1,setMenu1 }}>
      {props.children}

    </kContext.Provider>
  )
}

export default State;
