import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import {
  Alerts,
  ModalDeleteProduct,
  // ModalUpdate,
} from "../../../../../components/FormUtilities";
import { ModalUpdate } from "./GestionPedidosUtilitites";
import styles from "./GestionarPedidos.module.css";

const GestionarPedidos = () => {
  const [pedidos, setPedidos] = useState();
  const [show, setShow] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState();
  const [deletePedido, setDeletePedido] = useState(false);

  const [alert, setAlert] = useState();
  const [alertMsg, setAlertMsg] = useState();
  const [alertVariant, setAlertVariant] = useState();

  const handleShow = (pedido) => {
    setShow(!show);
    setSelectedPedido(pedido);
  };

  const getPedidos = async () => {
    const res = await fetch("/pedidos/getAllPedidos");
    const json = await res.json();
    setPedidos(json);
  };

  useEffect(() => {
    getPedidos();
  }, [show, deletePedido]);

  return (
    <Container fluid className={styles.container}>
      <h1 className="text-center pt-4">Gestión de Pedidos</h1>
      <div className={styles.tableCont}>
        {alert ? Alerts(alertMsg, alertVariant, setAlert) : null}
        <Table striped className="" responsive>
          <thead className={styles.tableHead}>
            <tr className="text-center">
              <th>ID</th>
              <th>Cliente</th>
              <th>Dirección</th>
              <th>Fecha del Pedido</th>
              <th>Total</th>
              <th>Status</th>
              <th>Modificar</th>
            </tr>
          </thead>
          <tbody>
            {pedidos ? (
              Object.keys(pedidos).map((item) => {
                return (
                  <tr className="text-center" key={pedidos[item].pedido_id}>
                    <td>{`#${pedidos[item].pedido_id}`}</td>
                    <td>{pedidos[item].user_id}</td>
                    <td>{`${pedidos[item].direccion}, ${pedidos[item].codigo_postal}`}</td>
                    <td>{pedidos[item].date}</td>
                    <td>{`$${pedidos[item].total}`}</td>
                    <td>{pedidos[item].status}</td>
                    <td>
                      <div className={styles.btnContainer}>
                        <div
                          className={styles.editIcon}
                          onClick={() => handleShow(pedidos[item])}
                        >
                          <i className="bx bxs-edit"></i>
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
            {show ? (
              <ModalUpdate
                show={show}
                handleClose={handleShow}
                selectedPedido={selectedPedido}
                setAlert={setAlert}
                setAlertMsg={setAlertMsg}
                setAlertVariant={setAlertVariant}
              />
            ) : null}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default GestionarPedidos;
