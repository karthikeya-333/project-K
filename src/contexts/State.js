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
  let [valid, setValid] = useState(false);
  let [menu, setMenu] = useState([]);
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
        setAttendance(recentTransaction1.attendance);
        setDay(dateDiffInDays(t3,today)  );
      }
    }
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
    //console.log(json);
    if(json.msg=="avaliable"){
      setMenu(json.menu.menu);
    }
    else{
      setMenu([]);
    }

  }

  async function addMenu(session){
    const response = await fetch("http://localhost:5000/api/session/addMenu", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({session,menu}),
    });
    let json=await response.json();
    //console.log(json);
    setMenu(json.menu);
  }




  return (
    <kContext.Provider value={{ getTransactions, transactions, valid, menu, setMenu, getMenu, attendance, day,addMenu }}>
      {props.children}

    </kContext.Provider>
  )
}

export default State;
