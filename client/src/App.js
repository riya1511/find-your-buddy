import React from "react";
import "./index.css";
import Home from "./Pages/Home";
import Dashboard from './Pages/Dashboard';
import Onboarding from './Pages/Onboarding';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function App() {

  const [cookie, setCookie, removeCookie] = useCookies(['user'])

  const authToken = cookie.Token

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {authToken && <Route path="/dashboard" element={<Dashboard />} />}
        {authToken && <Route path="/onboarding" element={<Onboarding />} />}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
