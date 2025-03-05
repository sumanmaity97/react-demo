import React, { useState } from "react";
import background from "../../public/loginBg.jpg";
import '../styles/Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passError, setPassError] = useState('');

    const validateEmail = (e) => {
        const value = e.target.value;
        setEmail(value);

        // Simple email validation regex
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(value)) {
            setEmailError('Invalid email address');
        } else {
            setEmailError('');
        }
    };

    const handleSubmit = () => {
        if (!emailError && email && password) {
            alert(`Submitted: ${email}`);
            setPassError('');
            setEmailError('');
        } else {
            if(!password){
                setPassError("Enter password");
            }
            if(!email && !emailError){
                setEmailError("Enter email")
            }
        }
    };

    return (
        <div className="fullscreen-background" style={{ backgroundImage: `url(${background})` }}>
            <div className="login-card" >
                <h3>Login</h3>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={validateEmail}
                        className="input"
                    />
                    {emailError && <p className="error">{emailError}</p>}
                </div>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                            if(e.target.value){
                                setPassError('');
                            }
                            else{
                                setPassError("Enter password");
                            }
                        }}
                        className="input"
                    />
                    {passError && <p className="error">{passError}</p>}
                </div>
                <button
                    onClick={handleSubmit}
                    className="submit-button"
                >
                    Submit
                </button>
            </div>
        </div>
    )
}

export default Login
