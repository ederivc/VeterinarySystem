import { Link, useRouteMatch } from "react-router-dom";
import { SidebarLink } from "../../../components/AccountUtilities";
import styles from "./AdminAccountPage.module.css";

const AdminAccountPage = () => {
  const { url } = useRouteMatch();
  return (
    <>
      <Link to={url} className={styles.inicioLink}>
        <div className="d-flex justify-content-center">
          <box-icon type="solid" name="home"></box-icon>
          <h4 className={styles.inicio}>Inicio</h4>
        </div>
      </Link>
      <h5 className={styles.sidebarSubtitle}>Registrar</h5>
      <SidebarLink
        url={`${url}/admin/registro/usuario`}
        iconClass="bxs-user-rectangle"
        linkText="Usuarios"
      />
      <SidebarLink
        url={`${url}/admin/registro/citas`}
        iconClass="bx-money"
        linkText="Citas"
      />
      <SidebarLink
        url={`${url}/admin/registro/productos`}
        iconClass="bxs-box"
        linkText="Productos"
      />
      <h5 className={styles.sidebarSubtitle}>Gestionar</h5>
      <SidebarLink
        url={`${url}/admin/gestion/usuario`}
        iconClass="bxs-user-account"
        linkText="Usuarios"
      />
      <SidebarLink
        url={`${url}/admin/gestion/citas/pendientes`}
        iconClass="bxs-calendar-edit"
        linkText="Citas Pendientes"
      />

      <SidebarLink
        url={`${url}/admin/gestion/citas/aprobadas`}
        iconClass="bxs-calendar-check"
        linkText="Citas Aprobadas"
      />
      <SidebarLink
        url={`${url}/admin/gestion/productos`}
        iconClass="bxs-dashboard"
        linkText="Productos"
      />
      <SidebarLink
        url={`${url}/admin/gestion/pedidos`}
        iconClass="bxs-package"
        linkText="Pedidos"
      />
    </>
  );
};

export default AdminAccountPage;
