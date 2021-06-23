import { APICitas, APIUsers } from "../../../../../api/api";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";

const ModalApprovedCita = ({
  show,
  handleClose,
  selectedCita,
  setAlert,
  setAlertMsg,
  setAlertVariant,
  message,
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
      handleAlert("Notificación al usuario hecha y cita aprovada.", "success");
    }
  };

  const handleDelete = async () => {
    const res = await APICitas.ApproveCita({
      cita: selectedCita,
    });
    checkResponse(res);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Aprovar Cita</Modal.Title>
      </Modal.Header>
      <Modal.Body>{`¿Está seguro que desa aprovar y notificar al cliente de la cita con fecha : ${selectedCita.appointment_date}?`}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleDelete}>
          Aprovar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const ModalRemoveCita = ({
  show,
  handleClose,
  selectedCita,
  setAlert,
  setAlertMsg,
  setAlertVariant,
  message,
  messageAlert,
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
    if (res[1].status === 400) {
      handleAlert(res[0]["message"], "danger");
    } else {
      handleAlert(`${messageAlert}`, "success");
    }
  };

  const handleDelete = async () => {
    const res = await APICitas.deleteCitaNotification({
      cita: selectedCita,
    });
    checkResponse(res);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Cita</Modal.Title>
      </Modal.Header>
      <Modal.Body>{`¿${message}: ${selectedCita.appointment_date}?`}</Modal.Body>
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

// const ModalUpdateCita = ({
//   show,
//   handleClose,
//   selectedCita,
//   setAlert,
//   setAlertMsg,
//   setAlertVariant,
// }) => {
//   const [formUser, setFormUser] = useState({
//     firstName: selectedCita.first_name,
//     lastName: selectedCita.last_name,
//     phone: selectedCita.phone,
//     status: selectedCita.status,
//   });

//   const handleChange = (e) => {
//     setFormUser({
//       ...formUser,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleAlert = (msg, variant) => {
//     setAlert(true);
//     setAlertMsg(msg);
//     setAlertVariant(variant);
//     setTimeout(() => {
//       setAlert(false);
//       setAlertMsg("");
//       setAlertVariant("");
//     }, 3000);
//     handleClose();
//   };

//   const checkResponse = (res) => {
//     if (res[1].status === 400) {
//       handleAlert(res[0]["message"], "danger");
//     } else {
//       handleAlert("Usuario modificado correctamente.", "success");
//     }
//   };

//   const updateUser = async () => {
//     const res = await APIUsers.updateUser({
//       id: selectedCita.user_id,
//       firstName: formUser.firstName,
//       lastName: formUser.lastName,
//       phone: formUser.phone,
//       status: formUser.status,
//       fecha: selectedCita.appointment_date.split(" ")[0],
//       hora: selectedCita.appointment_date
//         .split(" ")
//         .slice(1)
//         .toString()
//         .replace(",", " "),
//     });
//     checkResponse(res);
//   };

//   return (
//     <Modal show={show} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>Editar Usuario</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form>
//           <Form.Group className="mb-3" controlId="formNombre">
//             <Form.Label>Nombre del Usuario</Form.Label>
//             <Form.Control
//               value={formUser.firstName}
//               onChange={handleChange}
//               name="firstName"
//               type="text"
//               placeholder="Nombre del Usuario"
//             />
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="formApellidos">
//             <Form.Label>Apellidos</Form.Label>
//             <Form.Control
//               value={formUser.lastName}
//               onChange={handleChange}
//               name="lastName"
//               type="text"
//               placeholder="Apellidos del Usuario"
//             />
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="formPhone">
//             <Form.Label>Número de teléfono del Usuario</Form.Label>
//             <Form.Control
//               value={formUser.phone}
//               onChange={handleChange}
//               name="phone"
//               type="text"
//               placeholder="Teléfono del Usuario"
//             />
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="formStatus">
//             <Form.Label>Status del Usuario</Form.Label>
//             <Form.Control
//               as="select"
//               value={formUser.status}
//               onChange={handleChange}
//               name="status"
//             >
//               <option disabled value={-1}>
//                 Status actual: {selectedCita.status}
//               </option>
//               <option>Cliente</option>
//               <option>Administrador</option>
//             </Form.Control>
//           </Form.Group>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>
//           Cancelar
//         </Button>
//         <Button variant="primary" onClick={updateUser}>
//           Editar
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

export { ModalRemoveCita, ModalApprovedCita };
