import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { APIUsers } from "../../api/api";
import useAuth from "../../auth/useAuth";
import { Alerts } from "../../components/FormUtilities";
import styles from "./Login.module.css";

const LoginPage = () => {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({});
  const [showAlert, setShowAlert] = useState();
  const history = useHistory();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const getUser = async (response) => {
    if (response.status === 200) {
      const json = await response.json();
      setUser(json);
    } else {
      handleAlert();
    }
  };

  useEffect(() => {
    const redirect = () => {
      history.push("/cuenta");
    };
    if (user) redirect();
  }, [history, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await APIUsers.login({
      usera: form["email"],
      password: form["password"],
    });
    console.log("mia");
    getUser(response);
  };

  return (
    <div className={styles.wrapper}>
      <Container className={styles.container}>
        <Form className={styles.form}>
          <h1 className={styles.title}>Iniciar Sesión</h1>
          {showAlert
            ? Alerts("Usuario o contraseña incorrectos.", "danger")
            : null}
          <Form.Group controlId="formEmail">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control type="email" name="email" onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={handleChange}
            />
          </Form.Group>
          <Button
            variant="success"
            className={styles.submitBtn}
            onClick={handleSubmit}
          >
            Iniciar Sesión
          </Button>
          <Container className={styles.redirect}>
            ¿Aún no tienes cuenta? <Link to="/registro">Registrate</Link>
          </Container>
        </Form>
        <Container className={styles.imgContainer}>
          <img
            src="https://www.pinclipart.com/picdir/middle/547-5477824_veterinarian-clipart-love-transparent-background-vet-clipart-png.png"
            alt="img"
          ></img>
        </Container>
      </Container>
    </div>
  );
};

export default LoginPage;
