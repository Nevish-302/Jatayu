import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import React from "react";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";

//imports for dashboard

import DashPage from "./pages/DashPage1/DashPage";
import Team from "./pages/DashPage1/page/team/Team";
import Contacts from "./pages/DashPage1/page/contacts/Contacts";
import Invoices from "./pages/DashPage1/page/invoices/Invoices";
import Form from "./pages/DashPage1/page/form/Form";
import Calendar from "./pages/DashPage1/page/calendar/Calendar";
import FAQ from "./pages/DashPage1/page/faq/FAQ";
import BarChart from "./pages/DashPage1/page/barChart/BarChart";
import PieChart from "./pages/DashPage1/page/pieChart/PieChart";
import LineChart from "./pages/DashPage1/page/lineChart/LineChart";
import Geography from "./pages/DashPage1/page/geography/Geography";
import NotFound from "./pages/DashPage1/page/notFound/NotFound";
import Dashboard from "./pages/DashPage1/page/dashboard/Dashboard";

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
            <Route exact path="/dashboard" element={<DashPage />}>
              <Route index element={<Dashboard />} />
              <Route path="team" element={<Team />} />

              <Route path="contacts" element={<Contacts />} />
              <Route path="invoices" element={<Invoices />} />
              <Route path="form" element={<Form />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="bar" element={<BarChart />} />
              <Route path="pie" element={<PieChart />} />
              <Route path="line" element={<LineChart />} />
              <Route path="geography" element={<Geography />} />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
