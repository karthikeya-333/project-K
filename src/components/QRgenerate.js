

function QRgenerate(props){

    let date = props.date;
    let session = props.session;
    let user = localStorage.getItem("token");

    let message = user+"/"+date+"/"+session;

    let link = "https://api.qrserver.com/v1/create-qr-code/?data="+message+"&amp;size=100x100";

    //document.getElementsByTagName("img").src=link;


    return(
        <div style={{margin:5}}><img src={link} alt="qr" title="" /></div>
    )
};


export default QRgenerate;