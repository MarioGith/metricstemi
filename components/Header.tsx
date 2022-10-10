import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useAppContext } from "../context/AppContext";

const Header = () => {
  const [appState, setAppState] = useAppContext();
  const router = useRouter();
  const pathname = router.pathname;
  const current = pathname.split("/")[2];
  console.log(current);

  const renderTabs = () => {
    if (pathname.includes("dashboard")) {
      return (
        <Link href={"/admin/dashboard"} className="active">
          Overview
        </Link>
      );
    } else {
      return (
        <>
          <Link href={`/admin/${current}/first`} className="active">
            First
          </Link>
          <Link href={`/admin/${current}/second`} className="active">
            Second
          </Link>
          <Link href={`/admin/${current}/third`} className="active">
            Third
          </Link>
          <Link href={`/admin/${current}/fourth`} className="active">
            Fourth
          </Link>
        </>
      );
    }
  };

  return (
    <header className="app-header">
      <div className="app-header-logo">
        <div className="logo">
          <h1 className="logo-title">
            <span>Cloud</span>
            <span>Campus</span>
          </h1>
        </div>
      </div>
      <div className="app-header-navigation">
        <div className="tabs">{renderTabs()}</div>
      </div>
      <div className="app-header-actions">
        <button className="user-profile">
          <span>{appState.user}</span>
          <span></span>
        </button>
      </div>
      <div className="app-header-mobile">
        <button className="icon-button large">
          <i className="ph-list"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
