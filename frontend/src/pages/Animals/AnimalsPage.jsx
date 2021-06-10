import React, { useState } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import styles from "./AnimalPage.module.css";
import dog from "./dog1.png";
import cat from "./cat1.png";

const AnimalsPage = () => {
  const [info, setInfo] = useState("No hay nada");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container fluid className={styles.content}>
      <Row className={styles.headerImageDog}>
        <h1 className={styles.heading}>Perros</h1>
      </Row>
      <Row className="justify-content-center">
        <Col xs={6} md={3} className={styles.box}>
          <div className={styles.petImage}>
            <img src={dog} alt="doggy" />
            <span>COCO</span>
          </div>
          <div className={styles.content}>
            <p>Raza: Chihuahua</p>

            <button
              className={styles.slideUpBtn}
              onClick={() => {
                setInfo("Coco");
                handleShow();
              }}
            >
              <span>Adoptame</span>
            </button>
          </div>
        </Col>
        <Col xs={6} md={3} className={styles.box}>
          <div className={styles.petImage}>
            <img src={dog} alt="doggy" />
            <span>COCO</span>
          </div>
          <div className={styles.content}>
            <p>Raza: Chihuahua</p>
            <button
              className={styles.slideUpBtn}
              onClick={() => {
                setInfo("Coco2");
                handleShow();
              }}
            >
              <span>Adoptame</span>
            </button>
          </div>
        </Col>
        <Col xs={6} md={3} className={styles.box}>
          <div className={styles.petImage}>
            <img src={dog} alt="doggy" />
            <span>COCO</span>
          </div>
          <div className={styles.content}>
            <p>Raza: Chihuahua</p>
            <button
              className={styles.slideUpBtn}
              onClick={() => {
                setInfo("Coco3");
                handleShow();
              }}
            >
              <span>Adoptame</span>
            </button>
          </div>
        </Col>
      </Row>
      <Row className={styles.headerImageCat}>
        <h1 className={styles.heading}>Gatos</h1>
      </Row>
      <Row className="justify-content-center">
        <Col xs={6} md={3} className={styles.box}>
          <div className={styles.petImage}>
            <img src={cat} alt="kitten" />
            <span>FELIX</span>
          </div>
          <div className={styles.content}>
            <p>Raza: Americano</p>
            <button className={styles.slideUpBtn}>
              <span>Adoptame</span>
            </button>
          </div>
        </Col>
        <Col xs={6} md={3} className={styles.box}>
          <div className={styles.petImage}>
            <img src={cat} alt="kitten" />
            <span>FELIX</span>
          </div>
          <div className={styles.content}>
            <p>Raza: Americano</p>
            <button className={styles.slideUpBtn}>
              <span>Adoptame</span>
            </button>
          </div>
        </Col>
        <Col xs={6} md={3} className={styles.box}>
          <div className={styles.petImage}>
            <img src={cat} alt="kitten" />
            <span>FELIX</span>
          </div>
          <div className={styles.content}>
            <p>Raza: Americano</p>
            <button className={styles.slideUpBtn}>
              <span>Adoptame</span>
            </button>
          </div>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{info}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Raza Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Corporis dolorem minima officiis ratione aspernatur sapiente rerum
          possimus sunt repellat minus, maxime dolor sequi quam nihil. Eveniet
          laboriosam vel eum natus!
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AnimalsPage;
