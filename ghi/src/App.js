import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import SignupForm from "./signup.js";
import LoginForm from "./login.js";
import ReviewForm from './ReviewForm';
import Main from './MainPage';
import FacilitiesPage from './Facilities'
import FacilityDetail from './FacilityDetail';
import CampNav from './Nav';
import UserProfile from "./userprofile";
import CreateForm from "./createform";
import EditForm from "./editform";
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
            <Route path="facility/:parkCode/:facilityId" element={<FacilityDetail />} />
            <Route path="signup" element={<SignupForm />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="profile/:account_id" element={<UserProfile />} />
            <Route path="main" element={<UserProfile />} />
            <Route path="profile/" element={<CreateForm />} />
            <Route path="profile/edit" element={<EditForm />} />
            <Route path="facility" element={<FacilityDetail />} />
            <Route path="reviews/:parkCode/:facilityId" element={<ReviewForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
