import React from "react";
import './Dashboard.css'
import { updateDoc, getDoc, getFirestore, doc } from "firebase/firestore"
import { initializeApp } from "firebase/app";
import { useState } from "react/cjs/react.development";
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

function Dashboard({logid}){
    const [avatar, setavatar] = useState('avatar.png')
    const [user, setuser] = useState('')
    const [email, setmail] = useState('')
    const [date, setdate] = useState('2021-10-16')
    const [address, setadd] = useState('')

    async function get(){
        console.log(logid);
        const docref = doc(db, 'users', logid)
        console.log(docref);
        const docsnap = await getDoc(docref)
        setavatar(docsnap.data().avatar)
        setuser(docsnap.data().user)
        setmail(docsnap.data().email)
        setdate(docsnap.data().dob)
        setadd(docsnap.data().address);
    }
    get()

    async function update(){
        const avt = document.getElementById('avatar').src
        const dob = document.getElementById('dob').value
        const add = document.getElementById('add').value
        const userRef = doc(db, "users", logid);
        await updateDoc(userRef, {
            avatar : avt,
            dob : dob,
            address : add
        });
        document.getElementById('save').style.backgroundColor='lightgrey'
    }
    function upload(e){
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            const userRef = doc(db, "users", logid);
            updateDoc(userRef, {
                avatar : reader.result
            });
            setavatar(reader.result)
    }
    reader.readAsDataURL(file);
    }
    return(
        <div className='dashboard'>
            <div className='profile'>
                <label htmlFor="photo-upload" className="custom-file-upload fas">
                    <div className="img-wrap img-upload" >
                    <img id='avatar' for="photo-upload" src={avatar}/>
                    </div>
                    <input id="photo-upload" type="file" onChange={(e)=> upload(e)}/> 
                </label>
                <div style={{textTransform:"capitalize"}}>{user}</div>
            </div>
            <div className='details'>
                <div className='labelcontainer'>
                    <label for='email'>E-mail</label>
                    <label for='dob'>Date of Birth</label>
                    <label for='add'>Address</label>
                </div>
                <div className='info'>
                    <input id='email' type='email' value={email} disabled/>
                    <input id='dob' type='date' Value={date} onChange={()=> document.getElementById('save').style.backgroundColor='limegreen'}/>
                    <input id='add' type='text' Value={address} onChange={()=> document.getElementById('save').style.backgroundColor='limegreen'}/>
                </div>
            </div>
            <div><button id='save' onClick={()=>update()}>Save</button></div>
        </div>
    )
}

export default Dashboard;