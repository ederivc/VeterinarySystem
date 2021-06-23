import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { IMG_URL } from "../../api/api";
import { CartContext } from "../../layouts/Layout";
import styles from "./ProductsPage.module.css";

const ProductsPage = () => {
  const [products, setProducts] = useState();
  const { cart, setCard, addedProduct, setAddedProduct } =
    useContext(CartContext);
  const [newArr, setNewArr] = useState([]);

  const getProducts = async () => {
    const res = await fetch("/products/getProducts");
    const json = await res.json();
    setProducts(json);
  };

  const addProductCard = (product) => {
    setCard(cart + 1);
    console.log("++++");
    if (newArr.length === 0) {
      newArr.push(product);
    } else {
      console.log("not empty");
      setNewArr([...newArr, product]);
    }
    console.log(newArr);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Container fluid className={styles.products}>
      <h1 className={styles.heading}>Conoce Nuestros Productos</h1>
      <Container fluid className={styles.box_container}>
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
                        {products[item].price} <span>$70.99</span>{" "}
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
