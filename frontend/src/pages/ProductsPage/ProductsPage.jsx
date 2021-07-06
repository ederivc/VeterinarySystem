import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { IMG_URL } from "../../api/api";
import { CartContext } from "../../layouts/Layout";
import styles from "./ProductsPage.module.css";

const ProductsPage = () => {
  const [products, setProducts] = useState();
  const {
    cart,
    setCart,
    addedProduct,
    setAddedProduct,
    cartTotal,
    setCartTotal,
  } = useContext(CartContext);

  const [alert, setAlert] = useState();
  const [alertMsg, setAlertMsg] = useState();
  const [alertVariant, setAlertVariant] = useState();

  const getProducts = async () => {
    const res = await fetch("/products/getProducts");
    const json = await res.json();
    setProducts(json);
  };

  const handleAlert = (msg, variant) => {
    setAlert(true);
    setAlertMsg(msg);
    setAlertVariant(variant);
    setTimeout(() => {
      setAlert(false);
      setAlertMsg("");
      setAlertVariant("");
    }, 2000);
  };

  const addProductCard = (product) => {
    setCart(cart + 1);
    setCartTotal(cartTotal + product.price);
    setAddedProduct([product, ...addedProduct]);
    handleAlert("Producto agregado al carrito.", "success");
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Container fluid className={styles.products}>
      <h1 className={styles.heading}>Conoce Nuestros Productos</h1>
      <Container fluid className={styles.box_container}>
        {alert ? (
          <Alert variant={alertVariant} className="w-75 mx-auto">
            {alertMsg}
          </Alert>
        ) : null}
        <Row className="justify-content-md-center">
          {products
            ? Object.keys(products).map((item) => {
                return (
                  <Col
                    key={products[item].product_id}
                    lg={3}
                    className={styles.box}
                  >
                    <img
                      src={`${IMG_URL}${products[item].img}`}
                      alt={`producto${parseInt(item) + 1}`}
                    />
                    <div className={styles.content}>
                      <div className={styles.stars}></div>
                      <h3>{products[item].name}</h3>
                      {products[item].descripcion}
                      <div className={styles.price}>
                        ${products[item].price}
                      </div>
                      <div className={styles.iconCont}>
                        Agregar{" "}
                        <i
                          className="bx bxs-cart"
                          onClick={() => addProductCard(products[item])}
                        ></i>
                      </div>
                    </div>
                  </Col>
                );
              })
            : console.log("Loading")}
        </Row>
      </Container>
    </Container>
  );
};

export default ProductsPage;
