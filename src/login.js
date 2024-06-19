import React, { useState } from "react";
import './login.css';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then(
             async (userCredential) => {
            // Signed in
            const user = userCredential.user;

            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);
            
            if (userDoc.exists()) {
                const userData = userDoc.data();
                const userName = userData.name

                alert("Welcome " + userName)
            }
            navigate("/app")
        })
        .catch((error) => {
            alert("Pogreška prilikom prijave.");
        });
    }

    return(
        <div className="login">
            <div className="login-container">
                <h2 id="header2">Login</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="email" style={{ display:"block", marginBottom: "5px" }}>Username:</label>
                        <input
                            type="text"
                            id="username"
                            className="input-text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" style={{ display:"block", marginBottom: "5px" }}>Password:</label>
                        <input
                            type="password"
                            id="password"
                            className="input-text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button onClick={handleLogin} className="button-login">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
