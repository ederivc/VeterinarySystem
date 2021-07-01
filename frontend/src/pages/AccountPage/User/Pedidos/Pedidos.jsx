import { useEffect, useState } from "react";
import { Table, Col, Container, Row } from "react-bootstrap";
import { IMG_URL } from "../../../../api/api";
import { ProductInfo, NotFound } from "../../../../components/AccountUtilities";

import styles from "./Pedidos.module.css";

const Pedidos = () => {
  const [pedidos, setPedidos] = useState();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const fetchAppointments = async () => {
    const response = await fetch("/pedidos/getPedidos");
    const json = await response.json();
    setPedidos(json);
    setHasLoaded(true);

    Object.keys(json).length === 0 ? setIsEmpty(true) : setIsEmpty(false);

    console.log(json);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <Container fluid className={styles.wrapper}>
      <h1 className={`${styles.title} my-4`}>Pedidos</h1>
      {hasLoaded && !isEmpty ? (
        Object.keys(pedidos).map((i) => {
          return (
            <Row
              className={`${styles.productRow} col-12 px-0`}
              key={pedidos[i].pedido_id}
            >
              <Col md={6} className={`${styles.infoContainer} p-2 pl-3`}>
                <h3 className="text-center mb-3">Información del Pedido</h3>
                <ProductInfo
                  title="Pedido"
                  items={`#${pedidos[i].pedido_id}`}
                />
                <ProductInfo title="Fecha" items={pedidos[i].date} />
                <ProductInfo
                  title="Dirección de Envío"
                  items={`${pedidos[i].direccion} ${pedidos[i].codigo_postal}`}
                />
                <ProductInfo
                  title="Total del Pedido"
                  items={`$${pedidos[i].total}`}
                />
              </Col>
              <Col md={6}>
                <h3 className="text-center">Estado del Pedido</h3>
                <div className={styles.icons}>
                  <div
                    className={`${styles.iconContainer} ${styles.iconRealizado}`}
                  >
                    <img
                      src="/img/box.svg"
                      className={
                        pedidos[i].status === "Realizado"
                          ? styles.imgRealizado
                          : null
                      }
                      alt="box"
                    ></img>
                    <p className="text-center">Realizado</p>
                  </div>
                  <div className={styles.iconContainer}>
                    <img
                      className={
                        pedidos[i].status === "Enviado"
                          ? styles.imgEnviado
                          : null
                      }
                      style={{ backgroundColor: "red !important" }}
                      src="/img/enviado.svg"
                      alt="enviado"
                    />
                    <p className="text-center">Enviado</p>
                  </div>
                  <div className={styles.iconContainer}>
                    <img
                      src="/img/entregado.svg"
                      alt="entregado"
                      className={
                        pedidos[i].status === "Entregado"
                          ? styles.imgEntregado
                          : null
                      }
                    />
                    <p className="text-center">Entregado</p>
                  </div>
                </div>
              </Col>
              <Col className="mt-2">
                <Table striped hover responsive>
                  <thead className={styles.tableHead}>
                    <tr className="text-center">
                      <th>ID del producto</th>
                      <th>Nombre</th>
                      <th>Descripcion</th>
                      <th>Imágen</th>
                      <th>Precio</th>
                      <th>Artículos Comprados</th>
                      <th>Marca</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {pedidos[i].products.map((producto) => {
                      return (
                        <tr>
                          <td>{producto.product_id}</td>
                          <td>{producto.name}</td>
                          <td>{producto.descripcion}</td>
                          <td className={styles.imgCont}>
                            <img
                              src={`${IMG_URL}${producto.img}`}
                              alt={producto.name}
                            ></img>
                          </td>
                          <td>{producto.price}</td>
                          <td>{producto.totalNum}</td>
                          <td>{producto.marca}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Col>
            </Row>
          );
        })
      ) : (
        <NotFound
          title="Sin Pedidos 😔"
          text="Aún no cuentas con ningún pedido, dirigete a la sección de productos para realizar tu primera compra 😀"
        />
      )}
    </Container>
  );
};

export default Pedidos;
