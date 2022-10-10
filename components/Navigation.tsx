import React from "react";
import Link from "next/link";

import Footer from "./Footer";
import { useRouter } from "next/router";

const Navigation = () => {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <div className="app-body-navigation">
      <nav className="navigation">
        <div
          className={`navigation-link ${
            pathname.includes("dashboard") ? `navigation-link-active` : ``
          }`}
        >
          <i className="ph-browsers"></i>
          <Link href="/admin/dashboard">Dashboard</Link>
        </div>
        <div
          className={`navigation-link ${
            pathname.includes("kanban") ? `navigation-link-active` : ``
          }`}
        >
          <i className="ph-check-square"></i>
          <Link href="/admin/kanban/first">Métriques de Kanban</Link>
        </div>
        <div
          className={`navigation-link ${
            pathname.includes("pullrequest") ? `navigation-link-active` : ``
          }`}
        >
          <i className="ph-swap"></i>
          <Link href="/admin/pullrequest/first">Métriques de Pull Request</Link>
        </div>
        <div
          className={`navigation-link ${
            pathname.includes("permanent") ? `navigation-link-active` : ``
          }`}
        >
          <i className="ph-file-text"></i>
          <Link href="/admin/permanent/first">
            Métriques avec couche de persistance
          </Link>
        </div>
      </nav>
      <Footer />
    </div>
  );
};

export default Navigation;
