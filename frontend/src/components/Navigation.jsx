import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      variant="light"
      className={styles.navbar}
    >
      <Navbar.Brand as={Link} to="/" className={styles.brand}>
        Veterinary
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mx-auto">
          <Nav.Link as={Link} to="/cita" className={styles.navLink}>
            Cita
          </Nav.Link>
          <Nav.Link as={Link} to="/adquisicion" className={styles.navLink}>
            Adopción
          </Nav.Link>
          <Nav.Link as={Link} to="/productos" className={styles.navLink}>
            Productos
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link
            as={Link}
            to="/carrito"
            className={styles.navLink}
            title="Carrito de Compras"
          >
            <box-icon name="cart" type="solid" size="md"></box-icon>
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/login"
            className={styles.navLink}
            title="Iniciar Sesión"
          >
            <box-icon type="solid" name="user-circle" size="md"></box-icon>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
