import { useContext, useEffect } from "react";
import kContext from "../contexts/Context";


function QRgenerate(props) {

    let session=1,text="Upcoming";
    let context = useContext(kContext);
    let {menu,getMenu,attendance,day}=context;
    let view = false;
    var today = new Date().getHours();
    console.log(attendance,day);
    if(props.session=="breakfast"){
        session=1;
        if(today >= 7 && today <= 9  && attendance[day][session-1]==0){
            view=true;
            text="Running"
        }
        if(today>9){
            text="Missed";
        }
        if(attendance[day][session-1]==1){
            text="Attended";
        }
    }
    else if(props.session=="lunch" ){
        session=2;
        if(today >= 12 && today <= 14 && attendance[day][session-1]==0){
            view=true;
            text="Running"
        }
        if(today>14){
            text="Missed";
        }
        if(attendance[day][session-1]==1){
            text="Attended";
        }
    }
    else{
        session=3;
        if(today >= 17 && today <= 21 && attendance[day][session-1]==0){
            view=true;
            text="Running"
        }
        if(today>21){
            text="Missed";
        }
        if(attendance[day][session-1]==1){
            text="Attended";
        }
    }
    let user = localStorage.getItem("token");
    let message = user + "/" + session;
    let link = "https://api.qrserver.com/v1/create-qr-code/?data=" + message + "&amp;size=100x100";
    

    useEffect(() => {
        getMenu(props.index);
    }, []);
    

    return (
        <div className="box col-8">
            <div className=" d-flex session-box">
                <h2>{props.session}</h2> 
                <h2>{text}</h2>

            </div>
            {view && <div className="d-flex qr-box " >
                <div style={{ margin: 5 }} className="col-4"><img src={link} alt="qr" title="" className="text-center" /></div>
                <div className="col-8">
                    <h3 className="text-center">Menu</h3>
                    {menu.length!=0 ? menu.map((item) => {
                            return (
                                <h5 className="text-center">{item}</h5>
                            )
                        }) : <h5 className="text-center">NOT AVALIABLE</h5> }
                </div>
            </div>}
        </div>
    )
};



export default QRgenerate;