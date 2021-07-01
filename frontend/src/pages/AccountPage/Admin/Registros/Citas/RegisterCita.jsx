import React, { useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { APICitas } from "../../../../../api/api";
import { Alerts } from "../../../../../components/FormUtilities";
import { validateEmail } from "../../../../../components/Validations";
import styles from "./RegisterCita.module.css";

const RegisterCita = () => {
  const [alert, setAlert] = useState();
  const [alertMsg, setAlertMsg] = useState();
  const [alertVariant, setAlertVariant] = useState();

  const [appointment, setAppointment] = useState({
    nombre: "",
    apellidos: "",
    telefono: "",
    email: "",
    fecha: "",
    hora: "",
    desc: "",
  });

  const handleChange = (e) => {
    setAppointment({
      ...appointment,
      [e.target.name]: e.target.value,
    });
  };

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

  const checkResponse = (res) => {
    if (res[1].status === 400) {
      handleAlert(res[0]["message"], "danger");
    } else {
      handleAlert("Cita agendada correctamente.", "success");
    }
  };

  const sendRequest = async () => {
    const res = await APICitas.createCitaAdmin({
      nombre: appointment["nombre"],
      apellidos: appointment["apellidos"],
      telefono: appointment["telefono"],
      email: appointment["email"],
      fecha: appointment["fecha"],
      hora: appointment["hora"],
      descripcion: appointment["desc"],
    });
    setAppointment({
      nombre: "",
      apellidos: "",
      telefono: "",
      email: "",
      fecha: "",
      hora: "",
      desc: "",
    });
    checkResponse(res);
  };

  const verifyInputs = () => {
    for (const info in appointment) {
      if (appointment[info] === "") {
        handleAlert("No puedes dejar espacios en blanco", "danger");
        return;
      }
    }

    const phone = parseInt(appointment.telefono);
    if (isNaN(phone) || appointment.telefono.length !== 10) {
      handleAlert(
        "El teléfono está incorrecto, debe ser un número de 10 caracteres",
        "danger"
      );
      return;
    }

    if (!validateEmail(appointment.email)) {
      handleAlert("El formato del email no es correcto", "danger");
      return;
    }

    sendRequest();
  };

  const handleSubmit = () => {
    verifyInputs();
  };

  return (
    <div className={styles.wrapper}>
      <Container className={styles.container}>
        <h1 className={styles.title}>Reservar Cita</h1>
        <Form>
          {alert ? Alerts(alertMsg, alertVariant, setAlert) : null}
          <h2 className={styles.sectionSubtitle}>Datos Personales</h2>
          <Row>
            <Col>
              <Form.Group controlId="formNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  placeholder="Ingresa tu nombre"
                  className={styles.input}
                  value={appointment.nombre}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formApellidos">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control
                  type="text"
                  name="apellidos"
                  placeholder="Ingresa tus apellidos"
                  className={styles.input}
                  value={appointment.apellidos}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formTelefono">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  name="telefono"
                  placeholder="Ingresa tu número de teléfono"
                  className={styles.input}
                  value={appointment.telefono}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formEmail">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Ingresa tu correo electrónico"
                  className={styles.input}
                  value={appointment.email}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <h2 className={styles.sectionSubtitle}>Datos de la Cita</h2>
          <Row>
            <Col>
              <Form.Group controlId="formFecha">
                <Form.Label>Fecha de la Cita</Form.Label>
                <Form.Control
                  type="date"
                  name="fecha"
                  className={styles.input}
                  value={appointment.fecha}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Label>Hora de la Cita</Form.Label>
              <Form.Control
                as="select"
                name="hora"
                className={styles.input}
                value={appointment.hora}
                onChange={handleChange}
              >
                <option value={-1}>Seleccione la hora</option>
                <option>10:00 am</option>
                <option>11:00 am</option>
                <option>12:00 pm</option>
                <option>13:00 pm</option>
                <option>14:00 pm</option>
                <option>15:00 pm</option>
                <option>16:00 pm</option>
                <option>17:00 pm</option>
                <option>18:00 pm</option>
              </Form.Control>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formDesc">
                <Form.Label>Descripción o Síntomas</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="desc"
                  value={appointment.desc}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-end">
              <Button variant="danger" className="mr-3" size="lg">
                Cancelar
              </Button>
              <Button variant="primary" size="lg" onClick={handleSubmit}>
                Registrar
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default RegisterCita;
