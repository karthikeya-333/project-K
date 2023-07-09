import { useContext, useEffect } from "react";
import kContext from "../contexts/Context";
import Scanner from "./Scanner";


function AdminHome(){

    const context = useContext(kContext);
    let { getMenu } = context;

    // useEffect(() => {
    //     getMenu(1);
    //     getMenu(2);
    //     getMenu(3);
    // }, [])
    


    return(
        <>
        < Scanner className="text-center"/></>
    )
}

export default AdminHome;

