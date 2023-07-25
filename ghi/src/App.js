import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import "./App.css";
import SignupForm from "./signup.js";
import LoginForm from "./login.js";
import CampNav from './Nav';
import FacilityDetail from './FacilityDetail';
import UserProfile from "./userprofile";
import EditForm from "./editform";


function App() {
  const baseUrl = process.env.REACT_APP_API_HOST


  return (
    <AuthProvider baseUrl={baseUrl}>
      <BrowserRouter>
        <CampNav />
        <Routes>
          <Route path="/">
            <Route path="signup" element={<SignupForm />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="profile/:account_id" element={<UserProfile />} />
            <Route path="main" element={<UserProfile />} />
            <Route path="profile/" element={<EditForm />} />
            <Route path="facility" element={<FacilityDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
