import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./ProductsPage.module.css";
import product1 from "./p1.webp";
import product2 from "./p2.webp";
import product3 from "./p3.webp";
import product4 from "./p4.webp";
import product5 from "./p5.webp";
import product6 from "./p6.webp";

const ProductsPage = () => {
  return (
    <Container fluid className={styles.products}>
      <h1 className={styles.heading}>our latest products</h1>
      <Container fluid className={styles.box_container}>
        <Row className="justify-content-md-center">
          <Col lg={3} className={styles.box}>
            <img src={product1} alt="producto1" />
            <div className={styles.content}>
              <div className={styles.stars}></div>
              <h3>healthy pets food</h3>
              <div className={styles.price}>
                {" "}
                $10.03 <span>12.50</span>{" "}
              </div>
            </div>
          </Col>
          <Col lg={3} className={styles.box}>
            <img src={product2} alt="producto2" />
            <div className={styles.content}>
              <div className={styles.stars}></div>
              <h3>healthy pets food</h3>
              <div className={styles.price}>
                {" "}
                $10.03 <span>12.50</span>{" "}
              </div>
            </div>
          </Col>
          <Col lg={3} className={styles.box}>
            <img src={product3} alt="producto3" />
            <div className={styles.content}>
              <div className={styles.stars}></div>
              <h3>healthy pets food</h3>
              <div className={styles.price}>
                {" "}
                $10.03 <span>12.50</span>{" "}
              </div>
            </div>
          </Col>
          <Col lg={3} className={styles.box}>
            <img src={product4} alt="producto4" />
            <div className={styles.content}>
              <div className={styles.stars}></div>
              <h3>healthy pets food</h3>
              <div className={styles.price}>
                {" "}
                $10.03 <span>12.50</span>{" "}
              </div>
            </div>
          </Col>
          <Col lg={3} className={styles.box}>
            <img src={product5} alt="producto5" />
            <div className={styles.content}>
              <div className={styles.stars}></div>
              <h3>healthy pets food</h3>
              <div className={styles.price}>
                {" "}
                $10.03 <span>12.50</span>{" "}
              </div>
            </div>
          </Col>
          <Col lg={3} className={styles.box}>
            <img src={product6} alt="producto6" />
            <div className={styles.content}>
              <div className={styles.stars}></div>
              <h3>healthy pets food</h3>
              <div className={styles.price}>
                {" "}
                $10.03 <span>12.50</span>{" "}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default ProductsPage;
