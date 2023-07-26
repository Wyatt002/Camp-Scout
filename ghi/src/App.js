//import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import Construct from "./Construct.js";
//import ErrorNotification from "./ErrorNotification";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import "./App.css";
import SignupForm from "./signup.js";
import LoginForm from "./login.js";
import Main from './MainPage';
import FacilitiesPage from './Facilities'
import FacilityDetail from './FacilityDetail';
import CampNav from './Nav';
import Description from './DescriptionPage';


function App() {
  const baseUrl = process.env.REACT_APP_API_HOST
  return (
    <AuthProvider baseUrl={baseUrl}>
      <BrowserRouter>
      <CampNav />
        <Routes>
          <Route path="/">
            <Route path="" element={<Main />} />
            <Route path="description" element={<Description />} />
            <Route path="facilities" element={<FacilitiesPage />} />
            <Route path="facility/:facilityId" element={<FacilityDetail />} />
          </Route>
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
