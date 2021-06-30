import { Container } from "react-bootstrap";
import useAuth from "../../auth/useAuth";
import styles from "./AccountPage.module.css";

const WelcomeAccountPage = () => {
  const { user } = useAuth();

  return (
    <Container className={styles.mainWelcomeContainer}>
      <div className={styles.contentDiv}>
        <div className={styles.welcomeDiv}>
          <h1>Bienvenido de Nuevo</h1>
          <h2>{`${user.first_name} ${user.last_name}`}</h2>
          <p>
            Para navegar por el sistema, use la barra de navegacion lateral
            ubicada a la izquierda donde podrá desplegar y ocultar las distinas
            opciones.
          </p>
          <p>
            Para ocultar la barra de navegacion lateral, presione el boton
            ubicado en la barra de navegacion superior.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default WelcomeAccountPage;
