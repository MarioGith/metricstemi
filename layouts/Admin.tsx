import { AppProps } from "next/app";
import React from "react";
import { Header, Navigation, Sidebar } from "../components";

const Admin = ({ children }) => {
  return (
    <div className="app">
      <Header />
      <div className="app-body">
        <Navigation />
        {children}
        <Sidebar />
      </div>
    </div>
  );
};

export default Admin;
