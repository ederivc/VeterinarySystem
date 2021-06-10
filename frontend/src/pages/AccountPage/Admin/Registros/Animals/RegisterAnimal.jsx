import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { APIAnimals } from "../../../../../api/api";
import { Alerts } from "../../../../../components/FormUtilities";
import styles from "./RegistroAnimal.module.css";

const RegisterAnimal = () => {
  const [animals, setAnimals] = useState({
    nombre: "",
    precio: "",
    edad: "",
    descripcion: "",
    tipo: "",
  });

  const [fileName, setFileName] = useState("Seleccione una imágen...");
  const [selectedFile, setSelectedFile] = useState();

  const [alert, setAlert] = useState();
  const [alertMsg, setAlertMsg] = useState();
  const [alertVariant, setAlertVariant] = useState();

  const handleChange = (e) => {
    setAnimals({
      ...animals,
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

  const cleanInputs = () => {
    setAnimals({
      nombre: "",
      precio: "",
      edad: "",
      descripcion: "",
      tipo: "",
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
      handleAlert("Animal agregado correctamente.", "success");
    }
  };

  const handleSubmit = async () => {
    const res = await APIAnimals.createAnimal({
      nombre: animals.nombre,
      precio: animals.precio,
      edad: animals.edad,
      descripcion: animals.descripcion,
      tipo: animals.tipo,
      imgName: fileName,
      img: selectedFile,
    });
    checkResponse(res);
  };

  return (
    <div className={`${styles.wrapper}`}>
      <Container className={styles.container}>
        <h1 className="text-center">Registrar Animal</h1>
        <Form>
          {alert ? Alerts(alertMsg, alertVariant, setAlert) : null}
          <h2 className={styles.sectionSubtitle}>Datos del Animal</h2>
          <Row>
            <Col className="col-md-6 col-12">
              <Form.Group controlId="formNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  placeholder="Ingresa el nombre del animal"
                  className={styles.input}
                  value={animals.nombre_animal}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col className="col-md-6 col-12">
              <Form.Group controlId="formPrecio">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="text"
                  name="precio"
                  placeholder="Ingresa el precio del animal"
                  className={styles.input}
                  value={animals.precio}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="col-12 col-md-6">
              <Form.Group className="mb-3" controlId="formEdad">
                <Form.Label>Edad del animal</Form.Label>
                <Form.Control
                  type="text"
                  name="edad"
                  className={styles.input}
                  placeholder="Ingresa edad del animal"
                  value={animals.edad}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col className="col-12 col-md-6">
              <Form.Group className="mb-3" controlId="formTipo">
                <Form.Label>Tipo de animal</Form.Label>
                <Form.Control
                  as="select"
                  name="tipo"
                  className={styles.input}
                  value={animals.tipo}
                  onChange={handleChange}
                >
                  <option value={-1}>Seleccione el tipo de animal</option>
                  <option>Perro</option>
                  <option>Gato</option>
                  <option>Ave</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row className="d-flex align-items-center mb-3">
            <Col className="col-12 col-md-6">
              <Form.Group className="mb-3" controlId="formDesc">
                <Form.Label>Descripción del animal</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="descripcion"
                  value={animals.descripcion}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Label>Imágen del Animal</Form.Label>
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

export default RegisterAnimal;
