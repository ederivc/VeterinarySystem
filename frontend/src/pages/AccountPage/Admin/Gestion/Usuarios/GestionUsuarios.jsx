import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { Alerts } from "../../../../../components/FormUtilities";
import { ModalDeleteUser, ModalUpdateUser } from "./UsersUtilities";
import styles from "./GestionUsers.module.css";

const GestionUsuarios = () => {
  const [users, setUsers] = useState();

  const [show, setShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const [deleteUser, setDeleteUser] = useState(false);

  const [alert, setAlert] = useState();
  const [alertMsg, setAlertMsg] = useState();
  const [alertVariant, setAlertVariant] = useState();

  const handleShow = (user) => {
    setShow(!show);
    setSelectedUser(user);
  };

  const handleDelete = (user) => {
    setDeleteUser(!deleteUser);
    setSelectedUser(user);
  };

  const getUsers = async () => {
    const res = await fetch("/users/getUser");
    const json = await res.json();
    setUsers(json);
  };

  useEffect(() => {
    getUsers();
  }, [show, deleteUser]);

  return (
    <Container fluid className={styles.container}>
      <h1 className={styles.title}>Gestión de Usuarios</h1>
      <div className={styles.tableCont}>
        {alert ? Alerts(alertMsg, alertVariant, setAlert) : null}
        <Table striped className="" responsive>
          <thead className={styles.tableHead}>
            <tr className="text-center">
              <th>ID</th>
              <th>Email</th>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Teléfono</th>
              <th>Status</th>
              <th>Modificar</th>
            </tr>
          </thead>
          <tbody>
            {users ? (
              Object.keys(users).map((item) => {
                return (
                  <tr className="text-center" key={users[item].user_id}>
                    <td>{users[item].user_id}</td>
                    <td>{users[item].email}</td>
                    <td>{users[item].first_name}</td>
                    <td>{users[item].last_name}</td>
                    <td>{users[item].phone}</td>
                    <td>{users[item].status}</td>
                    <td>
                      <div className={styles.btnContainer}>
                        <div
                          className={styles.editIcon}
                          onClick={() => handleShow(users[item])}
                        >
                          <i className="bx bxs-edit"></i>
                        </div>
                        <div
                          className={styles.deleteIcon}
                          onClick={() => handleDelete(users[item])}
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
            {show ? (
              <ModalUpdateUser
                show={show}
                handleClose={handleShow}
                selectedUser={selectedUser}
                setAlert={setAlert}
                setAlertMsg={setAlertMsg}
                setAlertVariant={setAlertVariant}
              />
            ) : null}
            {deleteUser ? (
              <ModalDeleteUser
                show={deleteUser}
                handleClose={handleDelete}
                selectedUser={selectedUser}
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

export default GestionUsuarios;
