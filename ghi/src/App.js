//import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import Construct from "./Construct.js";
//import ErrorNotification from "./ErrorNotification";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";

import "./App.css";
import SignupForm from "./signup.js";
import LoginForm from "./login.js";
import MainPage from './Main';
import CampgroundDetail from './CampDetails';

function App() {
  const baseUrl = process.env.REACT_APP_API_HOST
// const [launchInfo, setLaunchInfo] = useState([]);
//   const [error, setError] = useState(null);
//   useEffect(() => {
//     async function getData() {
//       let url = `${process.env.REACT_APP_API_HOST}/api/launch-details`;
//       console.log("fastapi url: ", url);
//       let response = await fetch(url);
//       console.log("------- hello? -------");
//       let data = await response.json();
//       if (response.ok) {
//         console.log("got launch data!");
//         setLaunchInfo(data.launch_details);
//       } else {
//         console.log("drat! something happened");
//         setError(data.message);
//       }
//     }
//     getData();
  // }, []);
  return (
    <AuthProvider baseUrl={baseUrl}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="accounts">
            <Route path="signup" element={<SignupForm />} />
            <Route path="login" element={<LoginForm />} />
          </Route>
          <Route path="campgrounds/:id" element={<CampgroundDetail />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>

  );
}

export default App;
