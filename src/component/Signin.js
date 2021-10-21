import React from 'react'
import './Signin.css'
import { getDocs, getFirestore, collection, query,} from "firebase/firestore"
import { initializeApp } from "firebase/app";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyAj1jZ0XKG8742cfIOqiBeep-ZofILN_gU",
    authDomain: "krish-assignment.firebaseapp.com",
    projectId: "krish-assignment",
    storageBucket: "krish-assignment.appspot.com",
    messagingSenderId: "356350772111",
    appId: "1:356350772111:web:accbd2782fb6fe7f73c1fa",
    measurementId: "G-MS5SCLNK7X"
  };
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

function Signin({log, signed, setid}){

    function login(){
        let email = document.getElementById('email').value
        let pass = document.getElementById('pass').value
        
        if(email=='' || pass==''){
            document.getElementsByClassName('wrong')[0].style.display='block'
        }
        async function read(){
            await signInWithEmailAndPassword(auth, email, pass)
                .then(async (user) =>{ 
                    const q = query(collection(db, "users"));
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        if(doc.data().email==email){
                            setid(doc.id)
                        }
                    });
                    log(true)
                }).catch(err => {
                    document.getElementsByClassName('wrong')[0].style.display='block'
                })
        }
        read()
    }
    
    return(<>
        <div className='signup'>
            <div className='form'>
                <h2>Log In</h2>
                <div>Log in to your Account</div>
                <div className='wrong'>Invalid Username or Password</div>
                <input id='email' type='email' placeholder='E-mail' required={(e)=>!e.target.value.length}/>
                <input id='pass' type='password' placeholder='Password' required={(e)=>!e.target.value.length}/>
                <button onClick={()=>{ login() }}>Log In</button>
                <div className='sign'><span className='link' onClick={()=> signed(false)}>Create Account</span></div>
            </div>
        </div>
        </>
    )
}

export default Signin;