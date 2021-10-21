import React from 'react'
import './Signup.css'
import { addDoc, getFirestore, collection } from "firebase/firestore"
import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"

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

function ValidateEmail(inputText){
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(inputText.match(mailformat)){
        return true;
    }
    else{
        document.getElementById('emailerror').style.visibility='visible'
        return false;
    }
}

function Signup({log, signed, setid}){

    function signup(){
        document.getElementById('inputerror').style.visibility='hidden'
        document.getElementById('emailerror').style.visibility='hidden'
        document.getElementById('passerror').style.visibility='hidden'
        let user = document.getElementById('username').value
        let email = document.getElementById('email').value
        let pass = document.getElementById('pass').value
        
        if(user=='' || email=='' || pass==''){
            if(user=='')
                document.getElementById('inputerror').style.visibility='visible'
            else
                document.getElementById('inputerror').style.visibility='hidden'
            if(email=='')
                document.getElementById('emailerror').style.visibility='visible'
            else
                document.getElementById('emailerror').style.visibility='hidden'
            if(pass=='')
                document.getElementById('passerror').style.visibility='visible'
            else
                document.getElementById('passerror').style.visibility='hidden'
        }
        else if(ValidateEmail(email)){
            async function read(){
                await createUserWithEmailAndPassword(auth, email, pass)
                .then(async (cred) =>{ 
                    const data = {
                        avatar : 'avatar.png',
                        user : user,
                        email : email
                    }
                    const docRef = await addDoc(collection(db, "users"), data);
                    setid(docRef.id)
                    log(true)
                } ).catch(err => {
                    alert('Email already in use. Try other Email')
                })
            }
            read()
        }
    }

    return(
        <div className='signup'>
            <div className='form'>
                <h2>Sign Up</h2>
                <input id='username' type='text' placeholder='Name' />
                <div id='inputerror' className='error'>Field Required</div>
                <input id='email' type='email' placeholder='E-mail'/>
                <div id='emailerror' className='error'>Invalid E-mail</div>
                <input id='pass' type='password' placeholder='Password'/>
                <div id='passerror' className='error'>Field Required</div>
                <button onClick={()=>{ signup() }}>Create Account</button>
                <div>Already have an account? <span className='link' onClick={()=>{signed(true)}}>Login</span> here</div>
            </div>
        </div>
    )
}

export default Signup