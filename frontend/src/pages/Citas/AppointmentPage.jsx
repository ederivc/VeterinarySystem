import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { APICitas } from "../../api/api";
import useAuth from "../../auth/useAuth";
import { Alerts } from "../../components/FormUtilities";
import styles from "./AppointmentPage.module.css";

const AppointmentPage = () => {
  const { user } = useAuth();
  const [dates, setDates] = useState();
  const [hasLoaded, setHasLoaded] = useState();
  const [alert, setAlert] = useState();
  const [alertMsg, setAlertMsg] = useState();
  const [alertVariant, setAlertVariant] = useState();
  // const [selectedValue, setSelectedValue] = useState();
  // const isMountedRef = useRef(true);

  const [appointment, setAppointment] = useState({
    nombre: "",
    apellidos: "",
    telefono: "",
    email: "",
    fecha: "",
    hora: "",
    desc: "",
  });

  const getDates = async () => {
    const res = await APICitas.getDates();
    // if (isMountedRef.current) {
    setDates(res);
    setHasLoaded(true);
    // }
  };

  useEffect(() => {
    setAppointment({
      nombre: "",
      apellidos: "",
      telefono: "",
      email: user?.email ?? "",
      fecha: "",
      hora: "",
      desc: "",
    });
    getDates();
    // return () => {
    //   isMountedRef
    // }
    // return () => {
    //   setDates({});
    //   setHasLoaded({});
    //   setAppointment({});
    // };
  }, [user, hasLoaded]);

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
      nombre: "",
      apellidos: "",
      telefono: "",
      email: user?.email ?? "",
      fecha: "",
      hora: "",
      desc: "",
    });
    setHasLoaded(false);
    checkResponse(res);
  };

  return (
    <div className={styles.wrapper}>
      <Container className={styles.container}>
        <h1 className="text-center">Reservar Cita</h1>
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
                  min="2021-05-24"
                  max="2021-06-30"
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
                {hasLoaded ? (
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
                )}
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
