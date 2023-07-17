//import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import Construct from "./Construct.js";
//import ErrorNotification from "./ErrorNotification";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import "./App.css";
import SignupForm from "./signup.js";
import LoginForm from "./login.js";
<<<<<<< HEAD
import Main from './MainPage';


function App() {
  const baseUrl = process.env.REACT_APP_API_HOST
=======
import CampNav from './Nav';

function App() {
  const baseUrl = process.env.REACT_APP_API_HOST

>>>>>>> main
  return (
    <AuthProvider baseUrl={baseUrl}>
      <BrowserRouter>
        <CampNav />
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={<Main />} />
          <Route path="accounts">
=======
          <Route path="/">
>>>>>>> main
            <Route path="signup" element={<SignupForm />} />
            <Route path="login" element={<LoginForm />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
