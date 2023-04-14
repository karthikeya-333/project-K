import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import kContext from "../contexts/Context";
import QRgenerate from "./QRgenerate";
import Scanner from "./Scanner"


function Home() {
    const context = useContext(kContext);
    let { getTransactions,valid } = context;

    useEffect(() => {
       getTransactions();
    }, []);

    return (
        // <Scanner/>
        <div>
            <h1>homeee</h1>
            {valid ? <div><QRgenerate session="breakfast"  />
            <QRgenerate session="lunch" />
            <QRgenerate session="dinner" /> </div> : <h1><Link to="/payment"><button>pay</button></Link></h1>}
        </div>
        
        
    )
}

export default Home;


