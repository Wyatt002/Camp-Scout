//import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import Construct from "./Construct.js";
//import ErrorNotification from "./ErrorNotification";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";

import "./App.css";
import SignupForm from "./signup.js";
import LoginForm from "./login.js";
import Main from './MainPage';


function App() {
  const baseUrl = process.env.REACT_APP_API_HOST
  return (
    <AuthProvider baseUrl={baseUrl}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="accounts">
            <Route path="signup" element={<SignupForm />} />
            <Route path="login" element={<LoginForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
