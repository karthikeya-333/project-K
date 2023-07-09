import { useState, useRef } from "react";
import { QrReader } from "react-qr-reader";
import { useNavigate } from "react-router-dom";
const QRCodeWebcam = () => {
    const [webcamResult, setWebcamResult] = useState("NO RESULT");
    //const Navigate = useNavigate();

    let [on, setOn] = useState(false);
    const ref = useRef(0)

    function handleSwitch() {
        if (on) {
            window.location.reload()
        }
        setOn(!on);

    }

    const webcamError = (error) => {
        if (error) {
            console.log(error);
        }
    };
    const webcamScan = async (result) => {
        if (webcamResult === "NO RESULT" && on === true) {
            setWebcamResult(result.text);
            setOn(!on);
            console.log("hhu");
            const response = await fetch("http://localhost:5000/api/auth/verify-user", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ code: result.text })
            });
            const json = await response.json();
            if (json === true) {
                alert("Eligible");
            }
            else {
                alert("Not Eligible");
            }
            window.location.reload()
            //Navigate("/admin");
        }
    };
    return (
        <div className='payment'>
            <div className="container">
                <div className="form-group" style={{ display: "inline" }}>
                    <button  onClick={handleSwitch}>{on ? "Stop Scan" : "Start Scan"}</button>
                </div>
                {on && <>
                    <div className="card-body text-center">
                        <QrReader
                            delay={300}
                            onError={webcamError}
                            onResult={webcamScan}
                            legacyMode={false}
                            facingMode={"user"}
                        />
                    </div>
                </>}

            </div>
        </div>
    );
};

export default QRCodeWebcam;