import React from "react";
import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
import { Container, Button, Row, Col } from "react-bootstrap";
// import dog from "./c1.webp";
// import cat from "./c2.webp";
// import rabbit from "./c3.webp";
// import bird from "./c4.webp";
import product1 from "./p1.webp";
import product2 from "./p2.webp";
import product3 from "./p3.webp";
import product4 from "./p4.webp";
import product5 from "./p5.webp";
import product6 from "./p6.webp";
import offer1 from "./offer-img1.webp";
import offer2 from "./offer-img2.webp";

const HomePage = () => {
  return (
    <>
      {/* HEADER */}
      <Container fluid className={styles.containerHeader}>
        <div className={styles.content}>
          <span>Descuentas hasta del 50%</span>
          <h3>
            !Encuentra lo mejor para <br /> tu mascota!
          </h3>
          <Button
            className={styles.btn}
            variant="light"
            as={Link}
            to="/registro"
          >
            <p>Registrate</p>
          </Button>
        </div>
      </Container>

      {/* ADOPCION */}

      <Container fluid className={styles.offer}>
        <h3 className={styles.headingAdopcion}>Adopciones y Ventas</h3>
        <Row className={styles.boxContainer}>
          <Col sm={4} xl={5} className={styles.offerCol}>
            <img src={offer1} alt="offer1" />
            <div className={styles.contentAdopcion}>
              <span>best offer</span>
              <h3>upto 40% off</h3>
              <a href="/" className={styles.btnAdopPerro}>
                see offer
              </a>
            </div>
          </Col>
          <Col sm={4} xl={5} className={styles.offerCol}>
            <img src={offer2} alt="" />
            <div className={styles.contentAdopcion}>
              <span>only for today</span>
              <h3>upto 80% off</h3>
              <a href="/" className={styles.btnAdopGato}>
                see offer
              </a>
            </div>
          </Col>
        </Row>
      </Container>

      {/* PRODUCTS */}

      <Container fluid className={styles.products}>
        <h3 className={styles.headingProducts}>our latest products</h3>
        <Container fluid className={styles.box_container}>
          <Row className="justify-content-md-center">
            <Col lg={3} className={styles.box}>
              <img src={product1} alt="producto1" />
              <div className={styles.contentProducts}>
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
              <div className={styles.contentProducts}>
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
              <div className={styles.contentProducts}>
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
              <div className={styles.contentProducts}>
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
              <div className={styles.contentProducts}>
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
              <div className={styles.contentProducts}>
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
    </>
  );
};

export default HomePage;
