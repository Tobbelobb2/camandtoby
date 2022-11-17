import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, DocumentData } from 'firebase/firestore/lite';

function App() {

const firebaseConfig = {
  apiKey: "AIzaSyA0KsoKT8DHLRyeX5JJTN1p2CvkixQRuj0",
  authDomain: "camandtoby-6b17f.firebaseapp.com",
  projectId: "camandtoby-6b17f",
  storageBucket: "camandtoby-6b17f.appspot.com",
  messagingSenderId: "1085171741470",
  appId: "1:1085171741470:web:286d86277cf91ff5b8cf0f"
};

const db = getFirestore(initializeApp(firebaseConfig));

const [movies, setMovies] = useState<DocumentData[]>();

useEffect(() => {
  getMovies().then(result => setMovies(result))
}, [])

  // Get a list of cities from your database
  async function getMovies() {
      const watchedMovies = collection(db, 'watchedmovies');
      const movieSnapshot = await getDocs(watchedMovies);
      const movieList = movieSnapshot.docs.map(doc => doc.data());
      return movieList;
  }

  return (
    
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {"Cam and Toby have watched " + movies?.length + " movies"}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

