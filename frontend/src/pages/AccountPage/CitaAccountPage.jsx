import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { SidebarContext } from "../../components/BaseAccountPage";
import {
  Alerts,
  CustomModal,
  ModalDelete,
} from "../../components/FormUtilities";
import { NotFound } from "../../components/AccountUtilities";
import styles from "./AccountPage.module.css";

const CitaAccountPage = () => {
  const [appointment, setAppointment] = useState();
  const [hasLoaded, setHasLoaded] = useState();
  const [show, setShow] = useState(false);
  const [pickAppointment, setPickAppointment] = useState();
  const [deleteAppointment, setDeleteAppointment] = useState(false);

  const [alert, setAlert] = useState();
  const [alertMsg, setAlertMsg] = useState();
  const [alertVariant, setAlertVariant] = useState();

  const { sidebar, setSidebar } = useContext(SidebarContext);

  const handleShow = (appointmentID) => {
    setShow(!show);
    setPickAppointment(appointmentID);
  };

  const handleDelete = (appointmentID) => {
    setDeleteAppointment(!deleteAppointment);
    setPickAppointment(appointmentID);
  };

  const fetchAppointments = async () => {
    const response = await fetch("/citas/getAppointment");
    const json = await response.json();
    setAppointment(json);
    if (Object.keys(json).length === 0) {
      setHasLoaded(false);
    } else {
      setHasLoaded(true);
    }
  };

  useEffect(() => {
    fetchAppointments();
    setSidebar(true);
  }, [setSidebar, pickAppointment]);

  return (
    <Container fluid className={styles.citasContAcc}>
      <h1
        className={
          sidebar
            ? `col-md-8 ml-sm-auto col-lg-9 col-xl-10 p-0 ${styles.title}`
            : `${styles.title} col-12 p-0`
        }
      >
        Citas
      </h1>
      {alert ? Alerts(alertMsg, alertVariant) : null}
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
              <Col md={4} className="p-2" key={appointment[i].appointment_id}>
                <Card className={styles.card}>
                  <Card.Header>{`Cita: ${cont + 1}`}</Card.Header>
                  <Card.Body>
                    <Card.Title className="font-weight-bold">
                      {`Cita:`}{" "}
                      <span className="font-weight-normal">
                        {appointment[i].appointment_id}
                      </span>
                    </Card.Title>
                    <Card.Text className="font-weight-bold">
                      {`Fecha y hora: `}
                      <span className="font-weight-normal">
                        {appointment[i].appointment_date}
                      </span>
                    </Card.Text>
                    <Card.Text className="font-weight-bold">
                      {`Descripción: `}
                      <span className="font-weight-normal">
                        {appointment[i].descripcion}
                      </span>
                    </Card.Text>
                    <Card.Text className="font-weight-bold">
                      {`Estado de la cita: `}
                      <span className="font-weight-normal">
                        {appointment[i].approved === 1
                          ? "Aprobada"
                          : "Pendiente"}
                      </span>
                    </Card.Text>
                  </Card.Body>
                  <Row className={styles.rowContainer}>
                    <Button
                      variant="warning"
                      size="lg"
                      onClick={() => handleShow(appointment[i])}
                      disabled={appointment[i].approved === 1 ? true : false}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="lg"
                      onClick={() => handleDelete(appointment[i])}
                      disabled={appointment[i].approved === 1 ? true : false}
                    >
                      Eliminar
                    </Button>
                  </Row>
                </Card>
              </Col>
            );
          })
        ) : (
          <NotFound
            title="Sección vacia"
            text="Aún no cuentas con ninguna cita, dirigete a la sección de citas para agendar una"
          />
        )}
        {show ? (
          <CustomModal
            show={show}
            handleClose={handleShow}
            appointments={appointment}
            pickAppointment={pickAppointment}
            setAlert={setAlert}
            setAlertMsg={setAlertMsg}
            setAlertVariant={setAlertVariant}
          />
        ) : null}
        {deleteAppointment ? (
          <ModalDelete
            show={deleteAppointment}
            handleClose={handleDelete}
            pickAppointment={pickAppointment}
            setAlert={setAlert}
            setAlertMsg={setAlertMsg}
            setAlertVariant={setAlertVariant}
          />
        ) : null}
      </Row>
    </Container>
  );
};

export default CitaAccountPage;
