import { useEffect, useState } from "react";
import styles from "./UserAccount.module.css";
import { APIUsers } from "../../../../api/api";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { Alerts } from "../../../../components/FormUtilities";
import useAuth from "../../../../auth/useAuth";

const UserAccount = () => {
  const { user, checkSession } = useAuth();

  const [userForm, setUserForm] = useState({
    nombre: user.first_name,
    apellidos: user.last_name,
    email: user.email,
    telefono: user.phone,
    contraseña: "",
    newContraseña: "",
    newConfirmarContraseña: "",
  });

  const [alert, setAlert] = useState();
  const [alertMsg, setAlertMsg] = useState();
  const [alertVariant, setAlertVariant] = useState();

  const handleAlert = (msg, variant) => {
    setAlert(true);
    setAlertMsg(msg);
    setAlertVariant(variant);
    setTimeout(() => {
      setAlert(false);
      setAlertMsg("");
      setAlertVariant("");
    }, 3000);
  };

  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
  };

  const sendRequest = async () => {
    const res = await APIUsers.updateUserAccount({
      id: user.user_id,
      nombre: userForm.nombre,
      apellidos: userForm.apellidos,
      email: userForm.email,
      telefono: userForm.telefono,
      contraseña: userForm.contraseña,
      newContraseña: userForm.newContraseña,
      newConfirmarContraseña: userForm.newConfirmarContraseña,
    });
    if (res[1].status === 400) {
      handleAlert(res[0]["message"], "danger");
    } else {
      handleAlert(res[0]["Response"], "success");
      checkSession();
    }
  };

  useEffect(() => {
    setUserForm({
      nombre: user.first_name,
      apellidos: user.last_name,
      email: user.email,
      telefono: user.phone,
      contraseña: "",
      newContraseña: "",
      newConfirmarContraseña: "",
    });
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isNaN(userForm["telefono"]) || userForm["telefono"].length !== 10) {
      handleAlert(
        "El teléfono está incorrecto, debe ser un número de 10 caracteres",
        "danger"
      );
      return;
    }
    sendRequest();
  };

  return (
    <Container className={`${styles.container} pt-4 pb-5`}>
      <h1 className={styles.title}>Mi cuenta</h1>
      <Form className={`${styles.form}`} onSubmit={handleSubmit}>
        Dentro de este apartado puedes modificar tus datos.
        {alert ? Alerts(alertMsg, alertVariant, setAlert) : null}
        <h2 className={styles.sectionSubtitle}>Datos Personales</h2>
        <Row>
          <Col className="col-md-6 col-12">
            <Form.Group controlId="formId">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                name="id"
                placeholder={`#${user.user_id}`}
                className={styles.input}
                disabled
              />
            </Form.Group>
          </Col>
          <Col className="col-md-6 col-12">
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                placeholder="Ingresa tu nombre"
                className={styles.input}
                value={userForm.nombre}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="col-md-6 col-12">
            <Form.Group controlId="formApellidos">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                type="text"
                name="apellidos"
                placeholder="Ingresa tus apellidos"
                className={styles.input}
                value={userForm.apellidos}
                onChange={handleChange}
                isValid={false}
              />
            </Form.Group>
          </Col>
          <Col className="col-12 col-md-6">
            <Form.Group controlId="formEmail">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="text"
                name="email"
                placeholder={user.email}
                className={styles.input}
                disabled
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="col-12 col-md-6">
            <Form.Group controlId="formTelefono">
              <Form.Label>Número de Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="telefono"
                placeholder="Ingresa tu número telefonico"
                className={styles.input}
                value={userForm.telefono}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col className="col-12 col-md-6">
            <Form.Group controlId="formContraseña">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="contraseña"
                placeholder="Contraseña"
                className={styles.input}
                value={userForm.contraseña}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="formNewContraseña">
              <Form.Label>Confirmar Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="newContraseña"
                placeholder="Nueva contraseña"
                className={styles.input}
                value={userForm.newContraseña}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formNewConfirmarContraseña">
              <Form.Label>Confirmar Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="newConfirmarContraseña"
                placeholder="Confirmar nueva contraseña"
                className={styles.input}
                value={userForm.newConfirmarContraseña}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-end mt-3">
            <Button variant="danger" className="mr-3" size="lg">
              Cancelar
            </Button>
            <Button type="submit" variant="primary" size="lg">
              Modificar
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default UserAccount;
