import React, { useEffect, useState, useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useHistory } from "react-router-dom";
import { APIUsers } from "../../api/api";
import useAuth from "../../auth/useAuth";
import { Alerts } from "../../components/FormUtilities";
import { captchaKey } from "../../keys/keys";
import styles from "./Login.module.css";

const LoginPage = () => {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({});
  const [showAlert, setShowAlert] = useState();
  const [alertMsg, setAlertMsg] = useState();
  const captcha = useRef(null);
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
      setAlertMsg("Usuario o contraseña incorrectos");
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
    if (captcha.current.getValue() === "") {
      setAlertMsg("Debes aceptar el reCAPTCHA");
      handleAlert();
      return;
    }
    const response = await APIUsers.login({
      usera: form["email"],
      password: form["password"],
    });
    getUser(response);
  };

  return (
    <div className={styles.wrapper}>
      <Container className={`${styles.container}`}>
        <Form className={styles.form}>
          <h1 className={styles.title}>Iniciar Sesión</h1>
          {showAlert ? Alerts(alertMsg, "danger") : null}
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
          <Container className="d-flex justify-content-center mb-2 mt-4">
            <ReCAPTCHA ref={captcha} sitekey={captchaKey} />
          </Container>
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
        <Container className={`${styles.imgContainer} d-none d-md-flex`}>
          <img
            src="https://images-ext-1.discordapp.net/external/wgrUZvUhFjhapHFGUbFuDFgKS2a88VlwDgHS8G76dBA/https/www.pngkey.com/png/full/399-3993746_vet-png-veterinary-doctor-png.png"
            alt="img"
          ></img>
        </Container>
      </Container>
    </div>
  );
};

export default LoginPage;
