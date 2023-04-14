

function QRgenerate(props) {

    let session = props.session;
    let user = localStorage.getItem("token");

    let message = user + "/" + session;

    let link = "https://api.qrserver.com/v1/create-qr-code/?data=" + message + "&amp;size=100x100";

    return (
        <div className="box col-8">
            <div className=" d-flex session-box">
                <h2>{session}</h2> 
                <h2>Upcoming</h2>

            </div>
            <div className="d-flex qr-box " >
                <div style={{ margin: 5 }} className="col-4"><img src={link} alt="qr" title="" className="text-center" /></div>
                <div className="col-8">
                    <h3 className="text-center">Menu</h3>
                    <h5 className="text-center">item-1</h5>
                    <h5 className="text-center">item-2</h5>
                    <h5 className="text-center">item-3</h5>
                    <h5 className="text-center">item-4</h5>
                </div>
            </div>
        </div>
    )
};


export default QRgenerate;