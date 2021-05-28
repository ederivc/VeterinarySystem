import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { APIUsers } from "../../api/api";
import useAuth from "../../auth/useAuth";
import styles from "./Login.module.css";

const LoginPage = () => {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({});
  const history = useHistory();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const getUser = async (response) => {
    if (response.status === 200) {
      const json = await response.json();
      setUser(json.email);
    } else {
      console.log("INCORRECTO");
    }
  };

  useEffect(() => {
    console.log("jjjj");
    const redirect = () => {
      history.push("/registro");
    };
    if (user) redirect();
  }, [history, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await APIUsers.createUser({
      user: form["email"],
      password: form["password"],
    });
    getUser(response);
  };

  return (
    <Container className={styles.container}>
      <h1 className={styles.title}>Iniciar Sesión</h1>
      <Form className={styles.form}>
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
      </Form>
      <Container className={styles.redirect}>
        ¿Aún no tienes cuenta? <Link to="/registro">Registrate</Link>
      </Container>
    </Container>
  );
};

export default LoginPage;
