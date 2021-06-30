import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { Alerts } from "../../../../../../components/FormUtilities";
import { ModalRemoveCita } from "../CitasUtilities";
import styles from "./GestionCitasAprobadas.module.css";

const GestionCitasAprobadas = () => {
  const [citas, setCitas] = useState();

  const [selectedCitas, setSelectedCitas] = useState();
  const [approvedCitas, setApprovedCitas] = useState(false);

  const [alert, setAlert] = useState();
  const [alertMsg, setAlertMsg] = useState();
  const [alertVariant, setAlertVariant] = useState();

  const handleApprove = (cita) => {
    setApprovedCitas(!approvedCitas);
    setSelectedCitas(cita);
  };

  const getCitas = async () => {
    const res = await fetch("/citas/getCitaAprobada");
    const json = await res.json();
    setCitas(json);
  };

  useEffect(() => {
    getCitas();
  }, [approvedCitas]);

  return (
    <Container fluid className={styles.container}>
      <h1 className={styles.title}>Citas Aceptadas</h1>
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
              <th>Cita Realizada</th>
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
              <ModalRemoveCita
                show={approvedCitas}
                handleClose={handleApprove}
                selectedCita={selectedCitas}
                setAlert={setAlert}
                setAlertMsg={setAlertMsg}
                setAlertVariant={setAlertVariant}
                message="Está seguro que la cita ya se llevó a cabo y desea eliminarla"
                messageAlert="Cita eliminada."
              />
            ) : null}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default GestionCitasAprobadas;
