import styles from "./HomePage.module.css";
import { Container, Button, Row, Col, Carousel } from "react-bootstrap";
import { IMG_HOME_URL } from "../../api/api";
import { Link } from "react-router-dom";

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
            <h3>¡Ven y conocenos!</h3>
            <p>Conoce nuestros servicios para tu mascota.</p>
          </Carousel.Caption>
          <Carousel.Caption className={styles.smallCarouselText}>
            <p>Siempre sera importante cuidar de nuestros mejores amigos.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500} className={styles.carouselItem}>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1577175889968-f551f5944abd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
            alt="Second slide"
          />
          <Carousel.Caption className={styles.carouselCaption}>
            <h3>Explora y descubre</h3>
            <p>
              Nuestro sitio web proporcionara un pequeño vistazo a nuestros
              servicios.
            </p>
          </Carousel.Caption>
          <Carousel.Caption className={styles.smallCarouselText}>
            <p>Si te registras podras acceder a estas funcionalidades.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className={styles.carouselItem}>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1599443015574-be5fe8a05783?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
            alt="Third slide"
          />
          <Carousel.Caption className={styles.carouselCaption}>
            <h3>¿Tienes dudas?</h3>
            <p>Resuelve cualquier duda acudiendo a la sucursal</p>
          </Carousel.Caption>
          <Carousel.Caption className={styles.smallCarouselText}>
            <p>Todos los clientes son bienvendios.</p>
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
              <div className="icon-box">
                <div className={styles.icon}>
                  <i className="bx bx-plus-medical"></i>
                </div>
                <h4 className="title">
                  <a href="/" className={styles.serviceTitle}>
                    Medicina
                  </a>
                </h4>
                <p className="description">
                  Contamos con excelentes programas de medicina preventiva como
                  es la aplicación de vacunas para perros y gatos de los
                  laboratorios más reconocidos.
                </p>
              </div>
            </div>
          </Col>
          <Col
            className={`${styles.servicesCol} col-12 col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0 animate__animated animate__bounceInLeft`}
          >
            <div className={`${styles.colWrapper}`}>
              <div className="icon-box">
                <div className={styles.icon}>
                  <i className="bx bxs-bone"></i>
                </div>
                <h4 className="title">
                  <a href="/" className={styles.serviceTitle}>
                    Productos
                  </a>
                </h4>
                <p className="description">
                  Contamos con venta de Alimento, Medicamentos y Accesorios para
                  sus mascotas.
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
                    Adopción
                  </a>
                </h4>
                <p className="description">
                  Promovemos la adopción, no la compra de mascotas. Por lo que
                  colaboramos con distintos refugios en la búsqueda de hogares.
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
                    Consulta
                  </a>
                </h4>
                <p className="description">
                  Contamos con revisión médica por parte de nuestros doctores
                  para poder identificar algún padecimiento o enfermedad.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <Container fluid className={styles.agendarCitaContainer}>
        <h3>¿Se encuentra en alguna emergencia? ¿Necesita ayuda ahora?</h3>
        <p>
          Para nosotros es muy importante escucharte te pedimos por favor que
          agendes una cita y en breve el personal de nuestro equipo te
          contactará para dar atención a tu solicitud de información, gracias.
        </p>
        <Button as={Link} to="/cita" className={styles.agendarCitaBtn}>
          Agende una Cita ahora mismo
        </Button>
      </Container>

      <section className={`${styles.about} pb-5`}>
        <Container className="p-xs-3 p-md-0">
          <div className={styles.aboutHeader}>
            <h2 className="text-center">Acerca de Nosotros</h2>
            <p>
              En Veterinaria Valladolid el propósito es promover el bienestar de
              los animales a través de la excelencia en medicina veterinaria,
              estándares médicos, educación y servicio sin precedentes para
              nuestros clientes y la comunidad.
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
                Misión y Visión
              </h3>
              <p className="font-italic text-justify pt-2 mb-2">
                A continuación nuestra misión y visión.
              </p>
              <ul className="text-justify p-0">
                <li>
                  <i className="bx bx-check-circle"></i>
                  Nuestra visión es reconocer el valor de cada mascota y
                  cliente, comprometidos a proporcionar un valor excepcional en
                  el cuidado de sus mascotas.
                </li>
                <li>
                  <i className="bx bx-check-circle"></i>
                  Nuestra misión es proporcionar la atención médica de la más
                  alta calidad a nuestros pacientes en todos los aspectos del
                  cuidado y la propiedad de los animales, incluida la conciencia
                  de la salud pública.
                </li>
                <li>
                  <i className="bx bx-check-circle"></i> Ambas en conjunto
                  forman los ideales de nuestra empresa, y representan lo que
                  buscamos dia a dia con nuestros pacientes animales.
                </li>
              </ul>
              <p className="text-justify">
                Lo importante para nosotros son tus mejores amigos animales,
                recuerda, son familia, y hay que cuidarlos lo mas posible,
                ademas de brindarle servicio de calidad.
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
              Nuestros productos mas vendidos son aquellos disponibles la mayor
              parte del tiempo, ademas de que la mayor parte de nuestros
              clientes la recomiendan para sus mascotas.
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
                  <h4>Alimentador automatico</h4>
                  <span>Para perros y gatos</span>
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
                  <h4>Transportador de mascota</h4>
                  <span>
                    Lleva a tu mascota de viaje de forma comoda y segura
                  </span>
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
                  <h4>Casa grande de perro</h4>
                  <span>Con suficiente espacio para muchos tamaños</span>
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
                  <h4>Recogedor de desechos</h4>
                  <span>Limpia las necesidades de tu mascota</span>
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
              Nos encontramos ubicados en la calle Manantial Mintzita 173, Los
              Manantiales, 58188 Morelia, Mich. Te esperamos!
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
                  Manantial Mintzita 173, Los Manantiales, 58188 Morelia, Mich.
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
