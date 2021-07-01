import { Link } from "react-router-dom";
import styles from "./AccountUtilities.module.css";
import { Container } from "react-bootstrap";

const SidebarLink = ({ url, linkText, iconClass }) => {
  return (
    <li className={styles.navText}>
      <Link to={url} className={styles.sidebarOption}>
        <i className={`bx ${iconClass}`}></i>
        <span className={styles.sidebarSpan}>{linkText}</span>
      </Link>
    </li>
  );
};

const ProductInfo = ({ title, items }) => {
  return (
    <h5 className="mt-2">
      <span className="font-weight-bold">{title}</span>: {items}
    </h5>
  );
};

const NotFound = ({ title, text }) => {
  return (
    <Container className={styles.notFoundContainer}>
      <h2 className="text-center">{title}</h2>
      <span className="text-center">{text}</span>
    </Container>
  );
};

export { SidebarLink, ProductInfo, NotFound };
