import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import SignupForm from "./signup.js";
import LoginForm from "./login.js";
import ReviewForm from "./ReviewForm";
import Main from "./MainPage";
import FacilityDetail from "./FacilityDetail";
import CampNav from "./Nav";
import UserProfile from "./userprofile";
import CreateProfileForm from "./CreateProfileform.js";
import EditProfileForm from "./EditProfileForm.js";


function App() {
  const baseUrl = process.env.REACT_APP_API_HOST;


  return (
    <AuthProvider baseUrl={baseUrl}>
      <BrowserRouter>
        <CampNav />
        <Routes>
          <Route path="/">
            <Route path="" element={<Main />} />
            <Route path="facility/:parkCode/:facilityId" element={<FacilityDetail />} />
            <Route path="signup" element={<SignupForm />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="profile/:account_id" element={<UserProfile />} />
            <Route path="main" element={<UserProfile />} />
            <Route path="profile/" element={<CreateProfileForm />} />
            <Route path="profile/edit" element={<EditProfileForm />} />
            <Route path="reviews/:parkCode/:facilityId" element={<ReviewForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
