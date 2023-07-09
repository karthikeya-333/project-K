import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Forgotpass() {
    const navigate = useNavigate();

    let otp = {
        success: false,
        value: "",
        verified: false
    }

    const [email, setEmail] = useState();
    const [sentOTP, setSentOTP] = useState();
    const [OTP, setOTP] = useState(otp);
    const [credentials, setCredentials] = useState({ cpassword: "", password: "" })

    async function handleEmail(e) {
        setEmail(e.target.value);
    }


    async function sendOTP(e) {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/send-otp", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, purpose: "forgot" }),
        });
        const json = await response.json();
        if (json.success === true) {
            setOTP({ ...OTP, success: true });
            setSentOTP(json.otp);
        }
        else {
            alert("Invalid credentials");
        }

    }

    async function handleChangeOTP(e) {
        setOTP({ ...OTP, value: e.target.value });
    }

    async function verifyOTP(e) {
        // e.preventDefault();
        // const response = await fetch("http://localhost:5000/api/auth/verify-otp", {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({email,otp:String(OTP.value)}),
        // });
        // const json = await response.json();
        //console.log(json);
        if (sentOTP === OTP.value) {
            setOTP({ ...OTP, verified: true });
        }
        else {
            alert("Invalid OTP");
        }

    }

    function handlechangePass(e) {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (credentials.password === credentials.cpassword) {
            const response = await fetch("http://localhost:5000/api/auth/changepassword", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password: credentials.password }),
            });
            const json = await response.json();
            //console.log(json);
            if (json.success) {
                localStorage.setItem('token', json.authtoken);
                navigate("/");

            }

        }
        else {
            alert("passwords do not match");
        }
    }



    return (
        <div className='login'>
            <div className="container">
                <h2 style={{ marginBottom: 25 }}>Forgot Password</h2>
                <div className="form-group">
                    <label for="username">Username:</label>
                    <input type="email" id="username" name="email" placeholder="Enter your username" onChange={handleEmail} />
                </div>
                <div className="form-group">
                    <button type="submit" onClick={sendOTP}>Send OTP</button>
                </div>
                {OTP.success && <><div className="form-group">
                    <label for="username">OTP:</label>
                    <input type="number" value={OTP.value} onChange={handleChangeOTP} name="otp" />
                </div>
                <div className="form-group">
                <button type="submit" onClick={verifyOTP} >Verify</button>
            </div></>}
                {OTP.verified && <><div className="form-group">
                    <label for="username">Password:</label>
                    <input type="password" value={credentials.password} name="password" onChange={handlechangePass} />
                </div>
                <div className="form-group">
                    <label for="username">Confirm Password:</label>
                    <input type="password"  value={credentials.cpassword} name="cpassword" onChange={handlechangePass} />
                </div>
                <div className="form-group">
                    <button type="submit" onClick={handleSubmit} >Submit</button>
                </div></>}


            </div>
        </div>


    )
};

export default Forgotpass;



{/* <div>
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" onChange={handleEmail} id="email" name="email" />
            <button type="submit" onClick={sendOTP} className="btn btn-primary">send OTP</button>

            {OTP.success && <><label htmlFor="email" className="form-label">OTP</label>
                <input type="number" className="form-control" value={OTP.value} onChange={handleChangeOTP} name="otp" />
                <button type="submit" onClick={verifyOTP} className="btn btn-primary">verify</button></>}

            {OTP.verified && <>
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" value={credentials.password} name="password" onChange={handlechangePass} id="password" />
                <label htmlFor="password" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" value={credentials.cpassword} name="cpassword" onChange={handlechangePass} id="password" />
                <button type="submit" onClick={handleSubmit} className="btn btn-primary">submit</button> </>}
        </div> */}