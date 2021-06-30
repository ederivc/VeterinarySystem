import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import {
  Alerts,
  ModalDeleteProduct,
  ModalUpdate,
} from "../../../../../components/FormUtilities";
import styles from "./GestionProducts.module.css";

const GestionsProducts = () => {
  const [products, setProducts] = useState();
  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
  const [deleteProduct, setDeleteProduct] = useState(false);

  const [alert, setAlert] = useState();
  const [alertMsg, setAlertMsg] = useState();
  const [alertVariant, setAlertVariant] = useState();

  const handleShow = (product) => {
    setShow(!show);
    setSelectedProduct(product);
  };

  const handleDelete = (product) => {
    setDeleteProduct(!deleteProduct);
    setSelectedProduct(product);
  };

  const getProducts = async () => {
    const res = await fetch("/products/getProducts");
    const json = await res.json();
    setProducts(json);
  };

  useEffect(() => {
    getProducts();
  }, [show, deleteProduct]);

  return (
    <Container fluid className={styles.container}>
      <h1 className={styles.title}>Gestión de Productos</h1>
      <div className={styles.tableCont}>
        {alert ? Alerts(alertMsg, alertVariant, setAlert) : null}
        <Table striped className="" responsive>
          <thead className={styles.tableHead}>
            <tr className="text-center">
              <th>ID</th>
              <th>Nombre</th>
              <th>Marca</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Descripcion</th>
              <th>Modificar</th>
            </tr>
          </thead>
          <tbody>
            {products ? (
              Object.keys(products).map((item) => {
                return (
                  <tr className="text-center" key={products[item].product_id}>
                    <td>{products[item].product_id}</td>
                    <td>{products[item].name}</td>
                    <td>{products[item].marca}</td>
                    <td>{products[item].price}</td>
                    <td>{products[item].cantidad}</td>
                    <td>{products[item].descripcion}</td>
                    <td>
                      <div className={styles.btnContainer}>
                        <div
                          className={styles.editIcon}
                          onClick={() => handleShow(products[item])}
                        >
                          <i className="bx bxs-edit"></i>
                        </div>
                        <div
                          className={styles.deleteIcon}
                          onClick={() => handleDelete(products[item])}
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
              <ModalUpdate
                show={show}
                handleClose={handleShow}
                selectedProduct={selectedProduct}
                setAlert={setAlert}
                setAlertMsg={setAlertMsg}
                setAlertVariant={setAlertVariant}
              />
            ) : null}
            {deleteProduct ? (
              <ModalDeleteProduct
                show={deleteProduct}
                handleClose={handleDelete}
                selectedProduct={selectedProduct}
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

export default GestionsProducts;
