import React from 'react'
// import { signInWithEmailAndPassword } from "firebase/auth";
import { navigate } from '@reach/router';

export default function Login(props) {
    
    function loginToFirebase(e) {
    //     
    }

    return (
        <>
            <form onSubmit={(e) => loginToFirebase(e)} className='loginForm' id='loginForm' name='loginForm'>
                <input type="email" className='loginForm__email' name='email' id='email' placeholder='Insert Email' />
                <input type="password" className='loginForm__password' name='password' id='password' placeholder='Insert Password' />
                <button type='submit'>Login</button>
            </form>
        </>
    )
}
