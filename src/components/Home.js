import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import kContext from "../contexts/Context";
import QRgenerate from "./QRgenerate";
import Scanner from "./Scanner"


function Home() {
    const context = useContext(kContext);
    let { getTransactions, valid,getMenu } = context;
    const navigate = useNavigate();


    useEffect(() => {
        getTransactions();
        getMenu(1);
        getMenu(2);
        getMenu(3);
    }, []);


    return (
        // <Scanner/>
        <div>
            {/* <h1>homeee</h1> */}
            {valid ? <div><QRgenerate session="Breakfast" index={1} />
                <QRgenerate session="Lunch" index={2} />
                <QRgenerate session="Dinner" index={3} /> </div> : <div className="form-group text-center" style={{width:"50%"}}>
                <Link to="/payment"><button>pay</button></Link>
            </div>}
        </div>


    )
}

export default Home;


{/* <h1></h1> */}
