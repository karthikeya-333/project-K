import React, { useState } from 'react';
import { useHistory, useNavigate } from 'react-router-dom'




const Signup = () => {

    let otp = {
        success: false,
        value: "",
        verified: false
    }

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    const [OTP, setOTP] = useState(otp);
    const [sentOTP, setSentOTP] = useState();
    const navigate = useNavigate();


    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    async function sendOTP(e) {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/send-otp", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, purpose: "signin" }),
        });
        const json = await response.json();
        if (json.success == true) {
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
        //     body: JSON.stringify({email:credentials.email,otp:OTP.value}),
        // });
        // const json = await response.json();
        // console.log(json);
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
            const response = await fetch("http://localhost:5000/api/auth/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password }),
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
                <h2 style={{ marginBottom: 25 }}>Create an Account</h2>
                <div className="form-group">
                    <label for="username">Name:</label>
                    <input type="text" value={credentials.name} name="name" onChange={onChange} />
                </div>
                <div className="form-group">
                    <label for="username">Email:</label>
                    <input type="email" className="form-control" value={credentials.email} name="email" onChange={onChange} />
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
                        <input type="password" value={credentials.cpassword} name="cpassword" onChange={handlechangePass} />
                    </div>
                    <div className="form-group">
                        <button type="submit" onClick={handleSubmit} >Submit</button>
                    </div></>}


            </div>
        </div>




    )
}

export default Signup;


{/* <div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" value={credentials.name} name="name" onChange={onChange} id="email" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" value={credentials.email} name="email" onChange={onChange} id="email" aria-describedby="emailHelp" />

            </div>
            <button type="submit" onClick={sendOTP} className="btn btn-primary">send otp</button>
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