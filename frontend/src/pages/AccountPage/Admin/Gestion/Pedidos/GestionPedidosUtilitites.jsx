import { useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { APIPedidos, IMG_URL } from "../../../../../api/api";
import styles from "./GestionarPedidos.module.css";

const ModalUpdate = ({
  show,
  handleClose,
  selectedPedido,
  setAlert,
  setAlertMsg,
  setAlertVariant,
}) => {
  const [formPedido, setFormPedido] = useState({
    products: selectedPedido.products,
    status: selectedPedido.status,
  });

  const handleChange = (e) => {
    setFormPedido({
      ...formPedido,
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
    handleClose();
  };

  const checkResponse = (res) => {
    if (res[1].status === 400) {
      handleAlert(res[0]["message"], "danger");
    } else {
      handleAlert("Pedido modificado correctamente.", "success");
    }
  };

  const updatePedido = async () => {
    const res = await APIPedidos.updatePedido({
      id: selectedPedido.pedido_id,
      status: formPedido.status,
    });
    checkResponse(res);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Pedido</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Table striped hover responsive>
            <thead className={styles.tableHead}>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Imágen</th>
              </tr>
            </thead>
            <tbody>
              {selectedPedido.products.map((item) => {
                return (
                  <tr className="text-center" key={item.product_id}>
                    <td>{item.product_id}</td>
                    <td>{item.name}</td>
                    <td>{item.totalNum}</td>
                    <td className={styles.imgCont}>
                      <img src={`${IMG_URL}${item.img}`} alt={item.name}></img>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Form.Group className="mb-3" controlId="formStatus">
            <Form.Label>Status del Usuario</Form.Label>
            <Form.Control
              as="select"
              value={formPedido.status}
              onChange={handleChange}
              name="status"
            >
              <option disabled value={-1}>
                Status actual: {selectedPedido.status}
              </option>
              <option>Realizado</option>
              <option>Enviado</option>
              <option>Entregado</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={updatePedido}>
          Editar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { ModalUpdate };
