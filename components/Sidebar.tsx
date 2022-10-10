import React from "react";
import { useAppContext } from "../context/AppContext";

const Sidebar = () => {
  const [appState, setAppState] = useAppContext();

  return (
    <div className="app-body-sidebar">
      <section className="payment-section">
        <h2>Global Information</h2>
        <div className="payments">
          <div className="payment">
            <div className="payment-details">
              <h3>Project name</h3>
              <div>
                <span>{appState.projectTitle}</span>
              </div>
            </div>
          </div>
          <div className="payment">
            <div className="payment-details">
              <h3>Project owner</h3>
              <div>
                <span>{appState.projectOwner}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sidebar;
