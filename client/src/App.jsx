import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/signup";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
const App = () => {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login />}></Route>
            {/* <Route exact path="/" element={<LoginOTP />} /> */}
            {/* <Route exact path="/team" element={<Team />} /> */}
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
