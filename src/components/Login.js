import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        //console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/");

        }
        else {
            alert("Invalid credentials");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='login'>
            <div className="container">
                <h2>Login</h2>
                <form>
                    <div className="form-group">
                        <label for="username">Username:</label>
                        <input type="email" id="username" name="email" placeholder="Enter your username"  value={credentials.email} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label for="password">Password:</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" value={credentials.password} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <button type="submit" onClick={handleSubmit}>Login</button>
                    </div>
                    <div style={{ justifyContent: "space-between", display: "flex" }}>
                        <Link to="/forgotpass">Forgot Password?</Link>
                        <Link to="/signup">Sign Up</Link>
                    </div>

                </form>
            </div>
        </div>

    )
}

export default Login;

{/* <div>
            <form  onSubmit={handleSubmit}>
                <div classNameName="mb-3">
                    <label htmlFor="email" classNameName="form-label">Email address</label>
                    <input type="email" classNameName="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" classNameName="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div classNameName="mb-3">
                    <label htmlFor="password" classNameName="form-label">Password</label>
                    <input type="password" classNameName="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>
                <button type="submit" classNameName="btn btn-primary">Submit</button>
                <Link to="/forgotpass">forgot password?</Link>
                <Link to="/signup">Create an account</Link>
            </form>
        </div> */}