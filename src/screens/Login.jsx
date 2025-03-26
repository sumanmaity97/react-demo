import React, { useRef, useState } from "react";
import background from "../../public/loginBg.jpg";
import '../styles/Login.css';
import { showToast } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

function Login() {

    const passRef = useRef();
    const navigate = useNavigate();

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
            let userList = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
            console.log(userList, email, password);
            if (userList.length > 0) {
                let findIndex = userList.findIndex((item) => {
                    console.log(item.email === email , item.password === password);
                    return (item.email === email && item.password === password)
                });
                console.log(findIndex);
                if (findIndex === -1) {
                    showToast("User not found!", "error");
                    return;
                }
                console.log(userList[findIndex]);
                localStorage.setItem('userData', JSON.stringify(userList[findIndex]));
                localStorage.setItem('token', '1234');
                showToast('Successfully logged in!', "success");
                navigate("/home");
            }
            else {
                showToast("User not found!", "error");
                return;
            }
            setPassError('');
            setEmailError('');
        } else {
            if (!password) {
                setPassError("Enter password");
            }
            if (!email && !emailError) {
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
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                                if (!emailPattern.test(email)) {
                                    setEmailError('Invalid email address');
                                } else {
                                    setEmailError('');
                                    passRef?.current?.focus();
                                }
                            }
                        }}
                    />
                    {emailError && <p className="error">{emailError}</p>}
                </div>
                <div style={{ textAlign: 'center', marginTop: '20px', }}>
                    <input
                        ref={passRef}
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                            if (e.target.value) {
                                setPassError('');
                            }
                            else {
                                setPassError("Enter password");
                            }
                        }}
                        className="input"
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                handleSubmit();
                            }
                        }}
                    />
                    {passError && <p className="error">{passError}</p>}
                </div>

                <div className="mar-top">
                    <button onClick={handleSubmit} className="submit-button">
                        Submit
                    </button>
                </div>

                <div className="mar-top">
                    <a className="dont-text" onClick={() => navigate("/signup")}>Don't have an account? Create</a>
                </div>
            </div>
        </div>
    )
}

export default Login
