import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import DashPage from "./pages/DashPage";
const App = () => {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<LoginPage />}></Route>
            {/* <Route exact path="/" element={<LoginOTP />} /> */}
            {/* <Route exact path="/team" element={<Team />} /> */}
            <Route exact path="/signup" element={<SignupPage />} />
            <Route exact path="/dashboard" element={<DashPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
