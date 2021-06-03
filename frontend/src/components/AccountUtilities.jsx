import { Link } from "react-router-dom";
import styles from "./AccountUtilities.module.css";

const SidebarLink = ({ url, iconName, iconType, linkText }) => {
  return (
    <li className={styles.navText}>
      <Link to={url} className={styles.sidebarOption}>
        <box-icon type={iconType} name={iconName}></box-icon>
        <span className={styles.sidebarSpan}>{linkText}</span>
      </Link>
    </li>
  );
};

export { SidebarLink };
