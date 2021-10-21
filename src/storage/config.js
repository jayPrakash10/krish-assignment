// Initialize Cloud Firestore through Firebase
import {doc, getFirestore, collection, addDoc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { initializeApp } from "firebase/app";

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

// try {
//   const docRef = addDoc(collection(db, "users"), {
//     first: "Jay",
//     last: "Prakash",
//     born: 1998
//   });
//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }

const citiesRef = collection(db, "cities");

setDoc(doc(citiesRef, "SF"), {
    name: "San Francisco", state: "CA", country: "USA",
    capital: false, population: 860000,
    regions: ["west_coast", "norcal"] });
setDoc(doc(citiesRef, "LA"), {
    name: "Los Angeles", state: "CA", country: "USA",
    capital: false, population: 3900000,
    regions: ["west_coast", "socal"] });
setDoc(doc(citiesRef, "DC"), {
    name: "Washington, D.C.", state: null, country: "USA",
    capital: true, population: 680000,
    regions: ["east_coast"] });
setDoc(doc(citiesRef, "TOK"), {
    name: "Tokyo", state: null, country: "Japan",
    capital: true, population: 9000000,
    regions: ["kanto", "honshu"] });
setDoc(doc(citiesRef, "BJ"), {
    name: "Beijing", state: null, country: "China",
    capital: true, population: 21500000,
    regions: ["jingjinji", "hebei"] });

async function read(){
    // const querySnapshot = await getDocs(collection(db, "users"));
    // // console.log(querySnapshot);
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.id);
    // });

    const docRef = doc(db, "cities", "SF");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
}

read()

// const washingtonRef = doc(db, "users", "1mzV2tBNGwLlNcsFVTo");

// // Set the "capital" field of the city 'DC'
// updateDoc(washingtonRef, {
//   capital: true
// });