import React, { useRef, useState } from "react";
import background from "../../public/loginBg.jpg";
import '../styles/Login.css';
import { showToast } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();
    const emailRef = useRef();
    const passRef = useRef();
    const rePassRef = useRef();

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passError, setPassError] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [rePassError, setRePassError] = useState('');

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
        if (!emailError && email && password && name && rePassword && password === rePassword) {
            let userList = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
            if(userList.length > 0){
                let findIndex = userList.findIndex((item) => item.email === email);
                if(findIndex !== -1){
                    showToast("Email id already exists", "error");
                    return;
                }
                userList.push({
                    id: userList[userList.length - 1].id + 1,
                    name: name,
                    email: email,
                    password: password
                })
            }
            else{
                userList.push({
                    id: 1,
                    name: name,
                    email: email,
                    password: password
                })
            }
            showToast('Successfully registered!', "success");
            setNameError('');
            setPassError('');
            setEmailError('');
            setRePassError('');
            console.log("USERS: ", userList);
            localStorage.setItem('users', JSON.stringify(userList));
            navigate('/login');
        } else {
            if (!name) {
                setNameError('Enter name');
            }
            if (!password) {
                setPassError("Enter password");
            }
            if (!rePassword) {
                setRePassError("Re-enter password");
            }
            if (password && rePassword && password !== rePassword) {
                setRePassError("Password and confirm password does not match");
            }
            if (!email && !emailError) {
                setEmailError("Enter email")
            }
        }
    };

    return (
        <div className="fullscreen-background" style={{ backgroundImage: `url(${background})` }}>
            <div className="login-card" >
                <h3>Registration</h3>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                            if (e.target.value) {
                                setNameError('');
                            }
                            else {
                                setNameError("Enter name");
                            }
                        }}
                        className="input"
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                emailRef?.current?.focus();
                            }
                        }}
                    />
                    {nameError && <p className="error">{nameError}</p>}
                </div>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <input
                        ref={emailRef}
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
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
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
                                rePassRef?.current?.focus();
                            }
                        }}
                    />
                    {passError && <p className="error">{passError}</p>}
                </div>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <input
                        ref={rePassRef}
                        type="password"
                        placeholder="Re-enter password"
                        value={rePassword}
                        onChange={(e) => {
                            setRePassword(e.target.value)
                            if (e.target.value) {
                                if(e.target.value !== password){
                                    setRePassError("Password and confirm password does not match");
                                }
                                else{
                                    setRePassError('');
                                }
                            }
                            else {
                                setRePassError("Enter password");
                            }
                        }}
                        className="input"
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                handleSubmit();
                            }
                        }}
                    />
                    {rePassError && <p className="error">{rePassError}</p>}
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

export default Register;
