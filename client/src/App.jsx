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

import Team from "../src/pages/DashPage1/page/team/Team";
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
import Meta from "./pages/meta";
import Landing from "./pages/Landing/landing";

const App = () => {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/landing" element={<Landing />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard/" element={<DashPage />}>
              {/* Dashboard Home */}
              <Route index element={<Dashboard />} />

              {/* Teams Section */}
              <Route path="teams" element={<Team />} />

              {/* Contacts Section */}
              <Route path="contacts" element={<Contacts />} />

              {/* Invoices Section */}
              <Route path="invoices" element={<Invoices />} />

              {/* Profile Form */}
              <Route path="form" element={<Form />} />

              {/* Calendar */}
              <Route path="calendar" element={<Calendar />} />

              {/* FAQ Page */}
              <Route path="faq" element={<FAQ />} />

              {/* Bar Chart */}
              <Route path="bar" element={<BarChart />} />

              {/* Pie Chart */}
              <Route path="pie" element={<PieChart />} />

              {/* Line Chart */}
              <Route path="line" element={<LineChart />} />

              {/* Geography Chart */}
              <Route path="geography" element={<Geography />} />

              {/* NotFound */}
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/meta" element={<Meta />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
