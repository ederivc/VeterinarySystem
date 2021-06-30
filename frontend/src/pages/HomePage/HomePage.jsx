import styles from "./HomePage.module.css";
import { Container, Button, Row, Col, Carousel } from "react-bootstrap";
import { IMG_HOME_URL } from "../../api/api";

const HomePage = () => {
  return (
    <>
      <Carousel className={styles.carousel}>
        <Carousel.Item interval={1000} className={styles.carouselItem}>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1596272875729-ed2ff7d6d9c5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
            alt="First slide"
          />
          <Carousel.Caption className={styles.carouselCaption}>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
          <Carousel.Caption className={styles.smallCarouselText}>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500} className={styles.carouselItem}>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1577175889968-f551f5944abd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
            alt="Second slide"
          />
          <Carousel.Caption className={styles.carouselCaption}>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
          <Carousel.Caption className={styles.smallCarouselText}>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className={styles.carouselItem}>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1599443015574-be5fe8a05783?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
            alt="Third slide"
          />
          <Carousel.Caption className={styles.carouselCaption}>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
          <Carousel.Caption className={styles.smallCarouselText}>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Container className="pt-5 pb-4">
        <h2 className={`${styles.serviceMainTitle} text-center mb-5`}>
          Conoce Nuestros Servicios
        </h2>
        <Row>
          <Col
            className={`${styles.servicesCol} col-12 col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0 animate__animated animate__bounceInLeft`}
          >
            <div className={`${styles.colWrapper}`}>
              <div className="icon-box" data-aos="fade-up" data-aos-delay="100">
                <div className={styles.icon}>
                  <i className="bx bx-plus-medical"></i>
                </div>
                <h4 className="title">
                  <a href="/" className={styles.serviceTitle}>
                    Lorem Ipsum
                  </a>
                </h4>
                <p className="description">
                  Voluptatum deleniti atque corrupti quos dolores et quas
                  molestias excepturi
                </p>
              </div>
            </div>
          </Col>
          <Col
            className={`${styles.servicesCol} col-12 col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0 animate__animated animate__bounceInLeft`}
          >
            <div className={`${styles.colWrapper}`}>
              <div className="icon-box" data-aos="fade-up" data-aos-delay="100">
                <div className={styles.icon}>
                  <i className="bx bxs-bone"></i>
                </div>
                <h4 className="title">
                  <a href="/" className={styles.serviceTitle}>
                    Lorem Ipsum
                  </a>
                </h4>
                <p className="description">
                  Voluptatum deleniti atque corrupti quos dolores et quas
                  molestias excepturi
                </p>
              </div>
            </div>
          </Col>
          <Col
            className={`${styles.servicesCol} col-12 col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0 animate__animated animate__bounceInRight`}
          >
            <div className={`${styles.colWrapper}`}>
              <div className="icon-box" data-aos="fade-up" data-aos-delay="100">
                <div className={styles.icon}>
                  <i className="bx bxl-baidu"></i>
                </div>
                <h4 className="title">
                  <a href="/" className={styles.serviceTitle}>
                    Lorem Ipsum
                  </a>
                </h4>
                <p className="description">
                  Voluptatum deleniti atque corrupti quos dolores et quas
                  molestias excepturi
                </p>
              </div>
            </div>
          </Col>
          <Col
            className={`${styles.servicesCol} col-12 col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0 animate__animated animate__bounceInRight`}
          >
            <div className={`${styles.colWrapper}`}>
              <div className="icon-box" data-aos="fade-up" data-aos-delay="100">
                <div className={styles.icon}>
                  <i className="bx bxs-calendar-heart"></i>
                </div>
                <h4 className="title">
                  <a href="/" className={styles.serviceTitle}>
                    Lorem Ipsum
                  </a>
                </h4>
                <p className="description">
                  Voluptatum deleniti atque corrupti quos dolores et quas
                  molestias excepturi
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <Container fluid className={styles.agendarCitaContainer}>
        <h3>¿Se encuentra en alguna emergencia? ¿Necesita ayuda ahora?</h3>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>
        <Button>Agende una Cita ahora mismo</Button>
      </Container>

      <section className={`${styles.about} pb-5`}>
        <Container className="p-xs-3 p-md-0">
          <div className={styles.aboutHeader}>
            <h2 className="text-center">Acerca de Nosotros</h2>
            <p>
              Magnam dolores commodi suscipit. Necessitatibus eius consequatur
              ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam
              quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea.
              Quia fugiat sit in iste officiis commodi quidem hic quas.
            </p>
          </div>
          <Row>
            <Col className="col-12 col-lg-6">
              <img
                className="img-fluid"
                src="https://images.unsplash.com/photo-1553688738-a278b9f063e0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                alt="about-img"
              ></img>
            </Col>
            <Col className={`${styles.contentAbout} col-12 col-lg-6 pt-lg-0`}>
              <h3 className="mt-4 mt-md-3 mt-lg-0 text-center text-lg-left">
                Voluptatem dignissimos provident quasi corporis voluptates sit
                assumenda.
              </h3>
              <p className="font-italic text-justify pt-2 mb-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <ul className="text-justify p-0">
                <li>
                  <i className="bx bx-check-circle"></i> Ullamco laboris nisi ut
                  aliquip ex ea commodo consequat.
                </li>
                <li>
                  <i className="bx bx-check-circle"></i> Duis aute irure dolor
                  in reprehenderit in voluptate velit.
                </li>
                <li>
                  <i className="bx bx-check-circle"></i> Ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate trideta storacalaperda mastiro
                  dolore eu fugiat nulla pariatur.
                </li>
              </ul>
              <p className="text-justify">
                Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className={`${styles.productsContainer} py-5`}>
        <Container>
          <div className={`${styles.productsContHeader}`}>
            <h2>Productos más Vendidos</h2>
            <p className="py-3">
              Magnam dolores commodi suscipit. Necessitatibus eius consequatur
              ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam
              quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea.
              Quia fugiat sit in iste officiis commodi quidem hic quas.
            </p>
          </div>
          <Row className={styles.productsRow}>
            <div className="col-lg-3 col-md-6 d-flex justify-content-center">
              <div className={styles.productCard}>
                <div className={styles.productImgCont}>
                  <img
                    src={`${IMG_HOME_URL}prod1.jpg`}
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div className={styles.productInfo}>
                  <h4>Walter White</h4>
                  <span>Chief Medical Officer</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 d-flex justify-content-center">
              <div className={styles.productCard}>
                <div className={styles.productImgCont}>
                  <img
                    src={`${IMG_HOME_URL}prod2.png`}
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div className={styles.productInfo}>
                  <h4>Walter White</h4>
                  <span>Chief Medical Officer</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 d-flex justify-content-center">
              <div className={styles.productCard}>
                <div className={styles.productImgCont}>
                  <img
                    src={`${IMG_HOME_URL}prod3.jpg`}
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div className={styles.productInfo}>
                  <h4>Walter White</h4>
                  <span>Chief Medical Officer</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 d-flex justify-content-center">
              <div className={styles.productCard}>
                <div className={styles.productImgCont}>
                  <img
                    src={`${IMG_HOME_URL}prod4.jfif`}
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div className={styles.productInfo}>
                  <h4>Walter White</h4>
                  <span>Chief Medical Officer</span>
                </div>
              </div>
            </div>
          </Row>
        </Container>
      </section>

      <section id="contact" className={`${styles.contactCont}`}>
        <Container>
          <div className="text-center">
            <h2>Encuentranos</h2>
            <p className="my-4">
              Magnam dolores commodi suscipit. Necessitatibus eius consequatur
              ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam
              quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea.
              Quia fugiat sit in iste officiis commodi quidem hic quas.
            </p>
          </div>
        </Container>

        <div>
          <iframe
            className={styles.homeIframe}
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d939.0754918840064!2d-101.23734!3d19.699764!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842d0ea4e434e667%3A0xd59796c4e3a1d887!2sVeterinaria%20Valladolid!5e0!3m2!1ses-419!2smx!4v1625017609542!5m2!1ses-419!2smx"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
      </section>

      <footer className={`${styles.footer}`}>
        <div className="container">
          <nav className="row">
            <div className={`${styles.footerImg} col-12 col-lg-3`}>
              <img src="/logo.svg" alt="footer-img" />
            </div>
            <ul
              className={`${styles.footerCol} ${styles.footerColAddress} col-12 col-sm-4 col-lg-3`}
            >
              <div className={styles.footerColTitle}>
                <span>Ubicación</span>
              </div>
              <div className={styles.addressCont}>
                <span>
                  Constelaciones 357-Interior 1, Cosmos, 58050 Morelia, Mich.
                </span>
              </div>
            </ul>
            <ul
              className={`${styles.footerCol} ${styles.footerColLinks} col-12 col-sm-4 col-lg-3`}
            >
              <div className={styles.footerColTitle}>
                <span>Enlaces</span>
              </div>
              <li>Acerca de</li>
              <li>Nuestros Servicios</li>
              <li>Iniciar Sesión</li>
            </ul>

            <ul
              className={`${styles.footerCol} ${styles.footerColMedia} col-12 col-sm-4 col-lg-3`}
            >
              <div className={styles.footerColTitle}>
                <span>Redes Sociales</span>
              </div>
              <div className={styles.mediaIcons}>
                <li>
                  <i className="bx bxl-facebook-circle"></i>
                </li>
                <li>
                  <i className="bx bxl-youtube"></i>
                </li>
                <li>
                  <i className="bx bxl-twitter"></i>
                </li>
                <li>
                  <i className="bx bxl-whatsapp"></i>
                </li>
              </div>
            </ul>
          </nav>
        </div>
      </footer>
    </>
  );
};

export default HomePage;
