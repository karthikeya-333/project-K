import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import kContext from "../contexts/Context";
import QRgenerate from "./QRgenerate";


function Home() {
    const context = useContext(kContext);
    let { getTransactions,transactions, valid } = context;

    useEffect(() => {
       getTransactions();
    }, []);
    //console.log(localStorage.getItem("token"));
     //console.log(transactions);
    
    return (
        <>
            <h1>homee</h1>
            {valid ? <><QRgenerate session="breakfast" date="1/1/2023" />
            <QRgenerate session="lunch" date="1/1/2023" />
            <QRgenerate session="dinner" date="1/1/2023" /> <h1><Link to="/payment"><button>pay</button></Link></h1></> : <h1><Link to="/payment"><button>pay</button></Link></h1>}
        </>
    )
}

export default Home;