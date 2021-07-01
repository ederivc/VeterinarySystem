import { useEffect, useRef, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { APICitas, APIProducts, IMG_URL } from "../api/api";

const Alerts = (message, variant) => {
  return <Alert variant={variant}>{message}</Alert>;
};

const CustomModal = ({
  show,
  handleClose,
  appointments,
  pickAppointment,
  setAlert,
  setAlertMsg,
  setAlertVariant,
}) => {
  const [dates, setDates] = useState();
  const [hasLoaded, setHasLoaded] = useState();
  const isMountedRef = useRef(true);

  const [formData, setFormData] = useState({
    fecha: pickAppointment.appointment_date.split(" ")[0],
    hora: pickAppointment.appointment_date
      .split(" ")
      .slice(1)
      .toString()
      .replace(",", " "),
    desc: pickAppointment.descripcion,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
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
    console.log(res);
    if (res[1].status === 400) {
      handleAlert(res[0]["message"], "danger");
    } else {
      handleAlert("Cita modificada correctamente.", "success");
    }
  };

  const updateAppointment = async () => {
    const res = await APICitas.updateCita({
      fecha: formData.fecha,
      hora: formData.hora,
      descripcion: formData.desc,
      appointmentId: pickAppointment.appointment_id,
    });
    checkResponse(res);
  };

  const getCitas = async () => {
    const res = await APICitas.getDates();
    if (isMountedRef.current) {
      setDates(res);
      setHasLoaded(true);
    }
  };

  useEffect(() => {
    getCitas();
    return () => {
      // setDates({});
      // setHasLoaded({});
      isMountedRef.current = false;
    };
  }, []);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar cita</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formFecha">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              value={formData.fecha}
              onChange={handleChange}
              name="fecha"
              type="date"
              placeholder="Fecha"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Label>Hora de la Cita</Form.Label>
            <Form.Control
              as="select"
              name="hora"
              value={formData.hora}
              onChange={handleChange}
            >
              <option disabled value={-1}>
                {pickAppointment.appointment_date
                  .split(" ")
                  .slice(1)
                  .toString()
                  .replace(",", " ")}
              </option>
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
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDesc">
            <Form.Label>Desccripción</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Descripción"
              name="desc"
              value={formData.desc}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={updateAppointment}>
          Editar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const ModalDelete = ({
  show,
  handleClose,
  pickAppointment,
  setAlert,
  setAlertMsg,
  setAlertVariant,
}) => {
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
    console.log(res);
    if (res[1].status === 400) {
      handleAlert(res[0]["message"], "danger");
    } else {
      handleAlert("Cita eliminada correctamente.", "success");
    }
  };

  const handleDelete = async () => {
    const res = await APICitas.deleteCita({
      appointment: pickAppointment,
    });
    checkResponse(res);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Cita</Modal.Title>
      </Modal.Header>
      <Modal.Body>{`¿Está seguro que desea eliminar la cita con fecha: ${
        pickAppointment.appointment_date.split(" ")[0]
      } y hora: ${pickAppointment.appointment_date
        .split(" ")
        .slice(1)
        .toString()
        .replace(",", " ")}?`}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleDelete}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const ModalUpdate = ({
  show,
  handleClose,
  selectedProduct,
  setAlert,
  setAlertMsg,
  setAlertVariant,
}) => {
  const [formProduct, setFormProduct] = useState({
    name: selectedProduct.name,
    cantidad: selectedProduct.cantidad,
    price: selectedProduct.price,
    descripcion: selectedProduct.descripcion,
    marca: selectedProduct.marca,
  });

  const [fileName, setFileName] = useState(selectedProduct.img);
  const [selectedFile, setSelectedFile] = useState(
    `${IMG_URL}${selectedProduct.img}`
  );

  const handleChange = (e) => {
    setFormProduct({
      ...formProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const [file] = e.target.files;
    setFileName(file.name);

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedFile(reader.result);
    };
    reader.readAsDataURL(file);
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
      handleAlert("Cita modificada correctamente.", "success");
    }
  };

  const updateProduct = async () => {
    const res = await APIProducts.updateProduct({
      id: selectedProduct.product_id,
      name: formProduct.name,
      cantidad: formProduct.cantidad,
      price: formProduct.price,
      descripcion: formProduct.descripcion,
      marca: formProduct.marca,
      imgName: fileName,
      img: selectedFile,
    });
    checkResponse(res);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formNombre">
            <Form.Label>Nombre del Producto</Form.Label>
            <Form.Control
              value={formProduct.name}
              onChange={handleChange}
              name="name"
              type="text"
              placeholder="Nombre del Producto"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formMarca">
            <Form.Label>Marca del Producto</Form.Label>
            <Form.Control
              value={formProduct.marca}
              onChange={handleChange}
              name="marca"
              type="text"
              placeholder="Marca del Producto"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPrice">
            <Form.Label>Precio del Producto</Form.Label>
            <Form.Control
              value={formProduct.price}
              onChange={handleChange}
              name="price"
              type="text"
              placeholder="Precio del Producto"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCantidad">
            <Form.Label>Stock del Producto</Form.Label>
            <Form.Control
              value={formProduct.cantidad}
              onChange={handleChange}
              name="cantidad"
              type="text"
              placeholder="Stock del Producto"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDesc">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Descripción"
              name="descripcion"
              value={formProduct.descripcion}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formImagen">
            <Form.Label>Imágen del Producto</Form.Label>
            <Form.File
              custom
              label={fileName}
              data-browse="Seleccionar"
              onChange={handleFileChange}
              accept="image/*"
            ></Form.File>
            <img
              className="img-fluid mt-2"
              src={`${selectedFile}`}
              alt="product-view"
            ></img>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={updateProduct}>
          Editar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const ModalDeleteProduct = ({
  show,
  handleClose,
  selectedProduct,
  setAlert,
  setAlertMsg,
  setAlertVariant,
}) => {
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
    console.log(res);
    if (res[1].status === 400) {
      handleAlert(res[0]["message"], "danger");
    } else {
      handleAlert("Producto eliminado correctamente.", "success");
    }
  };

  const handleDelete = async () => {
    const res = await APIProducts.deleteProduct({
      product: selectedProduct,
    });
    checkResponse(res);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>{`¿Está seguro que desea eliminar el producto: ${selectedProduct.name}?`}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleDelete}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { Alerts, CustomModal, ModalDelete, ModalUpdate, ModalDeleteProduct };
