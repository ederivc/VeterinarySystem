import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { APIProducts } from "../../../../../api/api";
import { Alerts } from "../../../../../components/FormUtilities";
import styles from "./RegistroProducto.module.css";

const Products = () => {
  const [products, setProducts] = useState({
    nombre: "",
    marca: "",
    precio: "",
    cantidad: "",
    descripcion: "",
  });
  const [fileName, setFileName] = useState("Seleccione una imágen...");
  const [selectedFile, setSelectedFile] = useState();

  const [alert, setAlert] = useState();
  const [alertMsg, setAlertMsg] = useState();
  const [alertVariant, setAlertVariant] = useState();

  const handleChange = (e) => {
    setProducts({
      ...products,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    console.log(e);
    const [file] = e.target.files;
    setFileName(file.name);

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedFile(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const cleanInputs = () => {
    setProducts({
      nombre: "",
      marca: "",
      precio: "",
      cantidad: "",
      descripcion: "",
    });
    setSelectedFile();
    setFileName("Seleccione una imágen...");
  };

  const handleAlert = (msg, variant) => {
    setAlert(true);
    setAlertMsg(msg);
    setAlertVariant(variant);
    cleanInputs();
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
      handleAlert("Producto agregado correctamente.", "success");
    }
  };

  const sendRequest = async () => {
    const res = await APIProducts.createProduct({
      nombre: products.nombre,
      marca: products.marca,
      precio: products.precio,
      cantidad: products.cantidad,
      descripcion: products.descripcion,
      imgName: fileName,
      img: selectedFile,
    });
    checkResponse(res);
  };

  const verifyInputs = () => {
    for (const info in products) {
      if (products[info] === "") {
        handleAlert("No puedes dejar espacios en blanco", "danger");
        return;
      }
    }

    const precio = parseInt(products.precio);
    const cantidad = parseInt(products.cantidad);
    if (isNaN(precio) || isNaN(cantidad) || precio <= 0 || cantidad <= 0) {
      handleAlert(
        "El precio y la cantidad deben de ser números mayores que cero",
        "danger"
      );
      return;
    }

    sendRequest();
  };

  const handleSubmit = () => {
    verifyInputs();
  };

  return (
    <div className={`${styles.wrapper}`}>
      <Container className={styles.container}>
        <h1 className={styles.title}>Registrar Producto</h1>
        <Form>
          {alert ? Alerts(alertMsg, alertVariant, setAlert) : null}
          <h2 className={styles.sectionSubtitle}>Datos del Producto</h2>
          <Row>
            <Col className="col-12">
              <Form.Group controlId="formNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  placeholder="Ingresa el nombre del producto"
                  className={styles.input}
                  value={products.nombre}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col className="col-12">
              <Form.Group controlId="formmarca">
                <Form.Label>Marca</Form.Label>
                <Form.Control
                  type="text"
                  name="marca"
                  placeholder="Ingresa la marca del producto"
                  className={styles.input}
                  value={products.marca}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="col-12 col-md-6">
              <Form.Group controlId="formPrecio">
                <Form.Label>Precio del Producto</Form.Label>
                <Form.Control
                  type="text"
                  name="precio"
                  placeholder="Ingresa el precio del producto"
                  className={styles.input}
                  value={products.precio}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formCantidad">
                <Form.Label>Cantidad disponible del Producto</Form.Label>
                <Form.Control
                  type="text"
                  name="cantidad"
                  placeholder="Ingresa la cantidad disponible del producto"
                  className={styles.input}
                  value={products.cantidad}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="d-flex align-items-center mb-3">
            <Col className="col-12 col-md-6">
              <Form.Group className="mb-3" controlId="formDesc">
                <Form.Label>Descripción del producto</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="descripcion"
                  value={products.descripcion}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Label>Imágen del Producto</Form.Label>
              <Form.File
                custom
                label={fileName}
                data-browse="Seleccionar"
                onChange={handleFileChange}
                accept="image/*"
              ></Form.File>
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

export default Products;
