//import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import Construct from "./Construct.js";
//import ErrorNotification from "./ErrorNotification";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import "./App.css";
import SignupForm from "./signup.js";
import LoginForm from "./login.js";
import ReviewForm from './ReviewForm';
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
          <Route path="/" element={<Main />} />
          <Route path="/description" element={<Description />} />
          <Route path="/facilities" element={<FacilitiesPage />} />
          <Route path="/facility/details/:facilityId" element={<FacilityDetail />} />
          <Route path="accounts">
            <Route path="signup" element={<SignupForm />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="facility" element={<FacilityDetail />} />
          </Route>
          <Route path="reviews/:facilityId" element={<ReviewForm />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
