import React from "react";
import Admin from "../../../layouts/Admin";
import { useAppContext } from "../../../context/AppContext";

const Dashboard = () => {
  const [appState, setAppState] = useAppContext();
  return <Admin>Dashboard</Admin>;
};

export default Dashboard;
