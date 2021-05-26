import React from "react";
import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

const HomePage = () => {
  return (
    <Container fluid className={styles.container}>
      <div className={styles.content}>
        <span>Descuentas hasta del 50%</span>
        <h3>
          !Encuentra lo mejor para <br /> tu mascota!
        </h3>
        <Button className={styles.btn} variant="light" as={Link} to="/registro">
          <p>Registrate</p>
        </Button>
      </div>
    </Container>
  );
};

export default HomePage;
