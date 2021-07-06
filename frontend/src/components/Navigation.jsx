import { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuth from "../auth/useAuth";
import { CartContext } from "../layouts/Layout";
import styles from "./Navigation.module.css";

const Navigation = () => {
  const { user, setUser } = useAuth();
  const { cart } = useContext(CartContext);
  const { clearCartInputs } = useContext(CartContext);

  const handleLogOut = async (e) => {
    e.preventDefault();
    const response = await fetch("/auth/logout");
    const json = await response.json();
    console.log(json);
    setUser("");
    clearCartInputs();
  };

  return (
    <>
      <div
        className={`${styles.topbar} d-none d-lg-flex align-items-center fixed-top mb-5`}
      >
        <div className="container d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <i className="icofont-clock-time"></i> Lunes - Sábado, 8AM a 10PM
          </div>
          <div className="d-flex align-items-center">
            <i class="bx bxs-phone"></i> Llámanos 4431204200
          </div>
        </div>
      </div>
      <div className={`${styles.navCont}`}>
        <Navbar collapseOnSelect expand="lg" className={styles.navbar}>
          <Navbar.Brand as={Link} to="/" className={styles.brand}>
            <img src="/logo.svg" alt="logo"></img>
            <span>Veterinaria Valladolid</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link as={Link} to="/cita" className={styles.navLink}>
                Citas
              </Nav.Link>
              <Nav.Link as={Link} to="/productos" className={styles.navLink}>
                Productos
              </Nav.Link>
            </Nav>
            <Nav>
              <div className={styles.rigthCont}>
                <div className={styles.cartCont}>
                  <span>{cart}</span>
                  <Nav.Link
                    as={Link}
                    to="/carrito"
                    className={styles.navLink}
                    title="Carrito de Compras"
                  >
                    <box-icon
                      name="cart"
                      type="solid"
                      size="md"
                      color="#5b5b5b"
                    ></box-icon>
                  </Nav.Link>
                </div>
                {user ? null : (
                  <Nav.Link
                    as={Link}
                    to="/login"
                    className={styles.navLink}
                    title="Iniciar Sesión"
                  >
                    <box-icon
                      type="solid"
                      name="user-circle"
                      size="md"
                      color="#5b5b5b"
                    ></box-icon>
                  </Nav.Link>
                )}

                {user ? (
                  <Nav.Link as={Link} to="/cuenta" className={styles.navLink}>
                    Mi cuenta
                  </Nav.Link>
                ) : null}
                {user ? (
                  <Nav.Link onClick={handleLogOut} className={styles.navLink}>
                    Log out
                  </Nav.Link>
                ) : null}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
};

export default Navigation;
