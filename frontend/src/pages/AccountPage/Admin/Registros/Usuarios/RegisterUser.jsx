import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { APIUsers } from "../../../../../api/api";
import { Alerts } from "../../../../../components/FormUtilities";
import styles from "./RegisterUser.module.css";

const RegisterUser = () => {
  const [user, setUser] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    contraseña: "",
    confirmarContraseña: "",
    status: "Cliente",
  });

  const [alert, setAlert] = useState();
  const [alertMsg, setAlertMsg] = useState();
  const [alertVariant, setAlertVariant] = useState();

  const handleAlert = (msg, variant) => {
    setAlert(true);
    setAlertMsg(msg);
    setAlertVariant(variant);
    setTimeout(() => {
      setAlert(false);
      setAlertMsg("");
      setAlertVariant("");
    }, 3000);
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const hasWhiteSpace = () => {
    return /\s/g.test(user.contraseña);
  };

  const sendRequest = async () => {
    const res = await APIUsers.createUser({
      nombre: user.nombre,
      apellidos: user.apellidos,
      email: user.email,
      telefono: user.telefono,
      contraseña: user.contraseña,
      confirmarContraseña: user.confirmarContraseña,
      status: user.status,
    });
    if (res[1].status === 400) {
      handleAlert(res[0]["message"], "danger");
    } else {
      cleanInputs();
      handleAlert(res[0]["Response"], "success");
    }
  };

  const cleanInputs = () => {
    setUser({
      nombre: "",
      apellidos: "",
      email: "",
      telefono: "",
      contraseña: "",
      confirmarContraseña: "",
      status: "Cliente",
    });
  };

  const verifyPassword = () => {
    if (hasWhiteSpace()) {
      handleAlert("La contraseña no debe llevar espacios en blanco", "danger");
      return;
    } else {
      if (user.contraseña !== user.confirmarContraseña) {
        handleAlert("La contraseñas ingresadas no coinciden", "danger");
        return;
      } else {
        sendRequest();
      }
    }
  };

  const verifyInputs = () => {
    for (const info in user) {
      if (user[info] === "") {
        handleAlert("No puedes dejar espacios en blanco", "danger");
        return;
      }
    }

    const phone = parseInt(user.telefono);
    if (isNaN(phone) || user.telefono.length !== 10) {
      handleAlert(
        "El teléfono está incorrecto, debe ser un número de 10 caracteres",
        "danger"
      );
      return;
    }

    verifyPassword();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    verifyInputs();
  };

  return (
    <Container fluid className={`${styles.container} pt-2`}>
      <h1 className={styles.title}>Registrar Usuario</h1>
      <Form className={`${styles.form}`} onSubmit={handleSubmit}>
        {alert ? Alerts(alertMsg, alertVariant, setAlert) : null}
        <h2 className={styles.sectionSubtitle}>Datos Personales</h2>
        <Row>
          <Col className="col-md-6 col-12">
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                placeholder="Ingresa el nombre del usuario"
                className={styles.input}
                value={user.nombre}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col className="col-md-6 col-12">
            <Form.Group controlId="formApellidos">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                type="text"
                name="apellidos"
                placeholder="Ingresa los apellidos del usuario"
                className={styles.input}
                value={user.apellidos}
                onChange={handleChange}
                isValid={false}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="col-12 col-md-6">
            <Form.Group controlId="formEmail">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="text"
                name="email"
                placeholder="Ingresa el correo electrónico del usuario"
                className={styles.input}
                value={user.email}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formTelefono">
              <Form.Label>Número de Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="telefono"
                placeholder="Ingresa el número telefónico del usuario"
                className={styles.input}
                value={user.telefono}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="col-12 col-md-6">
            <Form.Group controlId="formContraseña">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="contraseña"
                placeholder="Contraseña (3 caracteres mínimo)"
                className={styles.input}
                value={user.contraseña}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formConfirmarContraseña">
              <Form.Label>Confirmar Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="confirmarContraseña"
                placeholder="Confirmar contraseña"
                className={styles.input}
                value={user.confirmarContraseña}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="col-12 col-md-6">
            <Form.Group className="mb-3" controlId="formStatus">
              <Form.Label>Status del Usuario</Form.Label>
              <Form.Control
                as="select"
                className={styles.input}
                value={user.status}
                onChange={handleChange}
                name="status"
              >
                <option>Cliente</option>
                <option>Administrador</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-end mt-3">
            <Button variant="danger" className="mr-3" size="lg">
              Cancelar
            </Button>
            <Button type="submit" variant="primary" size="lg">
              Registrar
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default RegisterUser;
