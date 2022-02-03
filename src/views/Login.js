import React from 'react'
import { browserLocalPersistence, getAuth, inMemoryPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { useHistory } from 'react-router-dom';

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
            <form onSubmit={(e) => {loginToFirebase(e)}} className='loginForm' id='loginForm' name='loginForm'>
                <input type="email" className='loginForm__email' name='email' id='email' placeholder='Insert Email' />
                <input type="password" className='loginForm__password' name='password' id='password' placeholder='Insert Password' />
                <label htmlFor="remember">
                    Remember me
                </label>
                <input type="checkbox" className='loginForm__remember' name="remember" id="remember" />
                <button type='submit'>Login</button>
            </form>
        </>
    )
}
