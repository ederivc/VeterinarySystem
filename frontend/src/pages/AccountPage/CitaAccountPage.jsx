import React, { useContext, useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import styles from "./AccountPage.module.css";
import { SidebarContext } from "./BaseAccountPage";

const CitaAccountPage = ({ children }) => {
  const [appointment, setAppointment] = useState();
  const [hasLoaded, setHasLoaded] = useState();

  const { sidebar, setSidebar } = useContext(SidebarContext);

  const fetchAppointments = async () => {
    const response = await fetch("/citas/getAppointment");
    const json = await response.json();
    setAppointment(json);
    setHasLoaded(true);
  };

  useEffect(() => {
    fetchAppointments();
    setSidebar(true);
  }, [setSidebar]);

  return (
    <Container fluid>
      <h1
        className={
          sidebar
            ? `col-md-8 ml-sm-auto col-lg-9 col-xl-10 p-0 ${styles.title}`
            : `${styles.title} col-12 p-0`
        }
      >
        Citas
      </h1>
      <Row
        className={
          sidebar
            ? `col-md-9 ml-sm-auto col-lg-10 col-xl-10 p-0 ${styles.infoContainer}`
            : `${styles.infoContainer} col-12 p-0`
        }
      >
        {hasLoaded ? (
          Object.keys(appointment).map((i, cont) => {
            return (
              <Col
                lg={3}
                md={4}
                className="p-2"
                key={appointment[i].appointment_id}
              >
                <Card>
                  <Card.Header>{`Cita: ${cont + 1}`}</Card.Header>
                  <Card.Body>
                    <Card.Title>{`Fecha: ${appointment[i].appointment_date}`}</Card.Title>
                    <Card.Text>{appointment[i].descripcion}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        ) : (
          <p>asdasd</p>
        )}
      </Row>
    </Container>
  );
};

export default CitaAccountPage;
