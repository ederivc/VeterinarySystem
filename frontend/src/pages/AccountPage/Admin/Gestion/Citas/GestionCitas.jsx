import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { Alerts } from "../../../../../components/FormUtilities";
import { ModalRemoveCita, ModalApprovedCita } from "./CitasUtilities";
import styles from "./GestionCitas.module.css";

const GestionCitas = () => {
  const [citas, setCitas] = useState();

  // const [show, setShow] = useState(false);
  const [selectedCitas, setSelectedCitas] = useState();
  const [deleteCitas, setDeleteCitas] = useState(false);
  const [approvedCitas, setApprovedCitas] = useState(false);

  const [alert, setAlert] = useState();
  const [alertMsg, setAlertMsg] = useState();
  const [alertVariant, setAlertVariant] = useState();

  // const handleShow = (cita) => {
  //   setShow(!show);
  //   setSelectedCitas(cita);
  // };

  const handleDelete = (cita) => {
    setDeleteCitas(!deleteCitas);
    setSelectedCitas(cita);
  };

  const handleApprove = (cita) => {
    setApprovedCitas(!approvedCitas);
    setSelectedCitas(cita);
  };

  const getCitas = async () => {
    const res = await fetch("/citas/getUserCita");
    const json = await res.json();
    setCitas(json);
  };

  useEffect(() => {
    getCitas();
  }, [deleteCitas, approvedCitas]);

  return (
    // <div className={styles.wrapper}>
    <Container fluid className={styles.container}>
      <h1 className={styles.title}>Citas Pendientes</h1>
      <div className={styles.tableCont}>
        {alert ? Alerts(alertMsg, alertVariant, setAlert) : null}
        <Table striped className="" responsive>
          <thead className={styles.tableHead}>
            <tr className="text-center">
              <th>ID Cita</th>
              <th>ID Usuario</th>
              <th>Nombre del Usuario</th>
              <th>Email del Usuario</th>
              <th>Fecha de la Cita</th>
              <th>Descripción</th>
              <th>Modificar</th>
            </tr>
          </thead>
          <tbody>
            {citas ? (
              Object.keys(citas).map((item) => {
                return (
                  <tr className="text-center" key={citas[item].appointment_id}>
                    <td>{citas[item].appointment_id}</td>
                    <td>{citas[item].guest_id ?? citas[item].user_id}</td>
                    <td>{citas[item].guest_name ?? citas[item].user_name}</td>
                    <td>{citas[item].guest_email ?? citas[item].user_email}</td>
                    <td>{citas[item].appointment_date}</td>
                    <td>{citas[item].descripcion}</td>
                    <td>
                      <div className={styles.btnContainer}>
                        <div
                          className={styles.checkIcon}
                          onClick={() => handleApprove(citas[item])}
                        >
                          <i className="bx bxs-check-circle"></i>
                        </div>
                        <div
                          className={styles.deleteIcon}
                          onClick={() => handleDelete(citas[item])}
                        >
                          <i className="bx bxs-trash-alt"></i>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>Loading</td>
              </tr>
            )}
            {approvedCitas ? (
              <ModalApprovedCita
                show={approvedCitas}
                handleClose={handleApprove}
                selectedCita={selectedCitas}
                setAlert={setAlert}
                setAlertMsg={setAlertMsg}
                setAlertVariant={setAlertVariant}
              />
            ) : null}
            {deleteCitas ? (
              <ModalRemoveCita
                show={deleteCitas}
                handleClose={handleDelete}
                selectedCita={selectedCitas}
                setAlert={setAlert}
                setAlertMsg={setAlertMsg}
                setAlertVariant={setAlertVariant}
                message="Está seguro que desea eliminar la cita y notificar al usuario de dicha acción"
                messageAlert="Cita eliminada y notificación enviada al usuario."
              />
            ) : null}
          </tbody>
        </Table>
      </div>
    </Container>
    // </div>
  );
};

export default GestionCitas;
