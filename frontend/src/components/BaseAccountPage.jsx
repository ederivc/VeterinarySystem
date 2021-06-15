import React, { createContext, useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";
import useAuth from "../auth/useAuth";
import AdminAccountPage from "../pages/AccountPage/Admin/AdminAccountPage";
import UserNavLinks from "../pages/AccountPage/User/UserNavLinks";
import styles from "./AccountUtilities.module.css";
import AccountRouter from "../routes/AccountRouter";

export const SidebarContext = createContext();

const BaseAccountPage = () => {
  const { user } = useAuth();
  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);
  const { path } = useRouteMatch();

  const contextValue = {
    sidebar,
    setSidebar,
  };

  return (
    <SidebarContext.Provider value={contextValue}>
      <Container fluid className={`${styles.container} p-0`}>
        <div className={styles.navbar}>
          <Link to="#" className={styles.menuBars}>
            <box-icon
              name="chevron-right-circle"
              type="solid"
              size="md"
              onClick={showSidebar}
            ></box-icon>
          </Link>
          <div className={styles.info}>{user.email}</div>
        </div>
        <nav
          className={
            sidebar ? `${styles.navMenu} ${styles.active}` : styles.navMenu
          }
        >
          <ul className={styles.navMenuItems} onClick={showSidebar}>
            <li className={styles.navbarToggle}>
              <Link to="#" className={styles.menuBars}>
                <box-icon
                  name="chevron-left-circle"
                  type="solid"
                  size="md"
                ></box-icon>
              </Link>
            </li>
            {user.status === "Cliente" ? (
              <UserNavLinks />
            ) : (
              <AdminAccountPage />
            )}
          </ul>
        </nav>
        <AccountRouter path={path} />
      </Container>
    </SidebarContext.Provider>
  );
};

export default BaseAccountPage;
