import React from 'react'
import { browserLocalPersistence, getAuth, inMemoryPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { useHistory } from 'react-router-dom';
import "./Login.scss";

export default function Login(props) {
    const auth = getAuth();
    const history = useHistory();
    
    function loginToFirebase(e) {
        e.preventDefault();
        var email = e.target.email.value;
        var password = e.target.password.value;
        var persistence = e.target.remember.checked;
        if (persistence) {
            persistence = browserLocalPersistence;
        } else {
            persistence = inMemoryPersistence;

        }
        setPersistence(auth, persistence)
        .then()
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            history.push("/");
        })
        .catch((error) => {
            // Give error message
        });
    }

    return (
        <>
            <div className="login">
                <form onSubmit={(e) => {loginToFirebase(e)}} className='loginForm' id='loginForm' name='loginForm'>
                    <div className="loginForm__inputGroup">
                        <label htmlFor="email">Email</label>
                        <input type="email" className='loginForm__email' name='email' id='email' />
                    </div>
                    <div className="loginForm__inputGroup">
                        <label htmlFor="password">Password</label>
                        <input type="password" className='loginForm__password' name='password' id='password' />
                    </div>
                    <div className="loginForm__rememberGroup">
                        <input type="checkbox" className='loginForm__remember' name="remember" id="remember" />
                        <label htmlFor="remember">Remember me</label>
                    </div>
                    
                    <button className='loginForm__submit' type='submit'>Login</button>
                </form>
            </div>
        </>
    )
}
