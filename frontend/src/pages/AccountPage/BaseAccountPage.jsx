import React, { createContext, useState } from "react";
import { Container } from "react-bootstrap";
import Switch from "react-bootstrap/esm/Switch";
import { Link, Route, useRouteMatch } from "react-router-dom";
import useAuth from "../../auth/useAuth";
import WelcomeAccountPage from "./WelcomeAccountPage";
import styles from "./AccountPage.module.css";
import CitaAccountPage from "./CitaAccountPage";
import UserNavLinks from "./UserNavLinks";
import AdminAccountPage from "./AdminAccountPage";

export const SidebarContext = createContext();

const BaseAccountPage = () => {
  const { user } = useAuth();
  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);
  let { path } = useRouteMatch();

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
            {user.status === "User" ? <UserNavLinks /> : <AdminAccountPage />}
          </ul>
        </nav>

        <Switch>
          <Route exact path={path}>
            <WelcomeAccountPage />
          </Route>
          <Route path={`${path}/citas`}>
            <CitaAccountPage />
          </Route>
          <Route path={`${path}/pedidos`}>
            <WelcomeAccountPage />
          </Route>
          <Route path={`${path}/admin/registro/usuario`}>
            <h1>Usuario</h1>
          </Route>
          <Route path={`${path}/admin/registro/citas`}>
            <h1>Cita</h1>
          </Route>
          <Route path={`${path}/admin/registro/producto`}>
            <h1>Producto</h1>
          </Route>
          <Route path={`${path}/admin/registro/animales`}>
            <h1>Animales</h1>
          </Route>
          <Route path={`${path}/admin/gestion/usuario`}>
            <h1>Gestion usuario</h1>
          </Route>
          <Route path={`${path}/admin/gestion/citas`}>
            <h1>Gestion cita</h1>
          </Route>
          <Route path={`${path}/admin/gestion/producto`}>
            <h1>Gestion producto</h1>
          </Route>
          <Route path={`${path}/admin/gestion/animales`}>
            <h1>Gestion animal</h1>
          </Route>
        </Switch>
      </Container>
    </SidebarContext.Provider>
  );
};

export default BaseAccountPage;
