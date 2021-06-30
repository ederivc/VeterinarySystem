import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { APICitas } from "../../api/api";
import useAuth from "../../auth/useAuth";
import { Alerts } from "../../components/FormUtilities";
import styles from "./AppointmentPage.module.css";

const AppointmentPage = () => {
  const { user } = useAuth();
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

  useEffect(() => {
    setAppointment({
      nombre: user?.first_name ?? "",
      apellidos: user?.last_name ?? "",
      telefono: user?.phone ?? "",
      email: user?.email ?? "",
      fecha: "",
      hora: "",
      desc: "",
    });
  }, [user]);

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

  const handleSubmit = async () => {
    const res = await APICitas.createCita({
      nombre: appointment["nombre"],
      apellidos: appointment["apellidos"],
      telefono: appointment["telefono"],
      email: appointment["email"],
      fecha: appointment["fecha"],
      hora: appointment["hora"],
      descripcion: appointment["desc"],
    });
    setAppointment({
      nombre: user?.first_name ?? "",
      apellidos: user?.last_name ?? "",
      telefono: user?.phone ?? "",
      email: user?.email ?? "",
      fecha: "",
      hora: "",
      desc: "",
    });
    // setHasLoaded(false);
    checkResponse(res);
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
                  disabled={user ? true : false}
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
                  disabled={user ? true : false}
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
                  disabled={user ? true : false}
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
                  disabled={user ? true : false}
                  value={appointment.email}
                  onChange={user ? null : handleChange}
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
                {/* {hasLoaded ? (
                  Object.keys(dates).map((key) => (
                    <option key={key}>
                      {dates[key]
                        .split(" ")
                        .slice(1)
                        .toString()
                        .replace(",", " ")}
                    </option>
                  ))
                ) : (
                  <option>Loading...</option>
                )} */}
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

export default AppointmentPage;
