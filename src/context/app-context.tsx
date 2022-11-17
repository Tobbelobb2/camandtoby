import React, {createContext} from "react";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyA0KsoKT8DHLRyeX5JJTN1p2CvkixQRuj0",
    authDomain: "camandtoby-6b17f.firebaseapp.com",
    projectId: "camandtoby-6b17f",
    storageBucket: "camandtoby-6b17f.appspot.com",
    messagingSenderId: "1085171741470",
    appId: "1:1085171741470:web:286d86277cf91ff5b8cf0f"
  };

const AppContext = createContext(initializeApp(firebaseConfig));


function useApp() {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within a AppContext.Provider");
  }
  return context;
}

export { AppContext, useApp };
