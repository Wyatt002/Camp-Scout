import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import "./App.css";
import SignupForm from "./signup.js";
import LoginForm from "./login.js";

function App() {
  const baseUrl = process.env.REACT_APP_API_HOST;
  return (
    <BrowserRouter>
      <AuthProvider baseUrl={baseUrl}>
        <Routes>
          <Route path="/accounts">
            <Route path="signup" element={<SignupForm />} />
            <Route path="login" element={<LoginForm />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
