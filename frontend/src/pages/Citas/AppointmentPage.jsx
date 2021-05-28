import React from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import styles from "./AppointmentPage.module.css";

const AppointmentPage = () => {
  return (
    <Container className={styles.container}>
      <h1 className="text-center">Reservar Cita</h1>
      <Form>
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
                max="2021-05-28"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Label>Hora de la Cita</Form.Label>
            <Form.Control as="select" className={styles.input}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formDesc">
              <Form.Label>Descripción o Síntomas</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-end">
            <Button variant="danger" className="mr-3" size="lg">
              Cancelar
            </Button>
            <Button variant="primary" size="lg">
              Registrar
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default AppointmentPage;
