import { useContext, useEffect, useState } from "react";
import kContext from "../contexts/Context";
import { useNavigate } from "react-router-dom";


function QRgenerate(props) {

    let session = 1, text = "Upcoming";
    let context = useContext(kContext);
    let { menu, getMenu, attendance, day } = context;
    let view = true;
    var today = new Date().getHours();
    let [menu1,setMenu1] = useState([])
    let navigate=useNavigate();
    // console.log(attendance,day);
    if (props.session == "Breakfast") {
        session = 1;
        if (today >= 7 && today <= 9 && attendance[day][session - 1] == 0) {
            view = true;
            text = "Running"
        }
        if (today > 9) {
            text = "Missed";
        }
        if (attendance[day][session - 1] == 1) {
            text = "Attended";
        }
    }
    else if (props.session == "Lunch") {
        session = 2;
        if (today >= 12 && today <= 14 && attendance[day][session - 1] == 0) {
            view = true;
            text = "Running"
        }
        if (today > 14) {
            text = "Missed";
        }
        if (attendance[day][session - 1] == 1) {
            text = "Attended";
        }
    }
    else {
        session = 3;
        if (today >= 17 && today <= 21 && attendance[day][session - 1] == 0) {
            view = true;
            text = "Running"
        }
        if (today > 21) {
            text = "Missed";
        }
        if (attendance[day][session - 1] == 1) {
            text = "Attended";
        }
    }
    let user = localStorage.getItem("token");
    let message = user + "/" + session;
    let link = "https://api.qrserver.com/v1/create-qr-code/?data=" + message + "&amp;size=100x100";

    // useEffect(() => {
    //     console.log(menu);
       
    //      console.log("hello")
    //     //setMenu1(menu[props.index-1]);
    // }, []);
    
    //navigate("/");
   
    


    return (
        <div className="home">
            <div className="container">
                <div className="session-header">
                    <h2 style={{ marginBottom: 0 }}>{props.session}</h2>
                    <h3 style={{ marginBottom: 0 }}>{text}</h3>
                </div>
                {view && <div className="session-box">
                    <div className="col-6 image-box">
                        <img src={link} alt="qr" title="" className="text-center" />
                    </div>
                    <div className="menu-box col-6">
                        <h3 className="text-center">Menu</h3>
                        { (menu[props.index-1] && menu[props.index-1].length!=0)? menu[props.index-1].map((item, index) => {
                            return (
                                <h5 key={index} className="text-center">{item}</h5>
                            )
                        }) : <h5 className="text-center">NOT AVALIABLE</h5>}

                    </div>
                </div>}
            </div>
        </div>

    )
};



export default QRgenerate;


