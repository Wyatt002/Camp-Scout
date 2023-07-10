import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import "./App.css";
import SignupForm from "./signup.js";


function App() {
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
    <BrowserRouter>
    <div className="container">
     <Routes>
        <Route path="/accounts" >
          <Route path="signup" element={<SignupForm />} />
        </Route>
     </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
