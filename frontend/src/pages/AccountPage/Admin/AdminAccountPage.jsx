import { Link, useRouteMatch } from "react-router-dom";
import { SidebarLink } from "../../../components/AccountUtilities";

const AdminAccountPage = () => {
  const { url } = useRouteMatch();
  return (
    <>
      {/* <SidebarLink
        url={`${url}`}
        iconType="solid"
        iconName="home"
        linkText="INICIO"
      /> */}
      <Link to={url}>
        <div className="d-flex justify-content-center">
          <box-icon type="solid" name="home"></box-icon>
          <h4 className="">Inicio</h4>
        </div>
      </Link>
      <h5>Registrar</h5>
      <SidebarLink
        url={`${url}/admin/registro/usuario`}
        iconType="solid"
        iconName="user-rectangle"
        linkText="Usuarios"
      />
      <SidebarLink
        url={`${url}/admin/registro/citas`}
        iconType=""
        iconName="money"
        linkText="Citas"
      />
      <SidebarLink
        url={`${url}/admin/registro/productos`}
        iconType="solid"
        iconName="box"
        linkText="Productos"
      />
      <SidebarLink
        url={`${url}/admin/registro/animales`}
        iconType="logo"
        iconName="baidu"
        linkText="Animales"
      />

      <h5>Gestionar</h5>
      <SidebarLink
        url={`${url}/admin/gestion/usuario`}
        iconType="solid"
        iconName="user-account"
        linkText="Usuarios"
      />
      <SidebarLink
        url={`${url}/admin/gestion/citas/pendientes`}
        iconType="solid"
        iconName="calendar-edit"
        linkText="Citas Pendientes"
      />
      <SidebarLink
        url={`${url}/admin/gestion/citas/aprobadas`}
        iconType="solid"
        iconName="calendar-check"
        linkText="Citas Aprobadas"
      />
      <SidebarLink
        url={`${url}/admin/gestion/productos`}
        iconType="solid"
        iconName="dashboard"
        linkText="Productos"
      />
      <SidebarLink
        url={`${url}/admin/gestion/pedidos`}
        iconType="solid"
        iconName="package"
        linkText="Pedidos"
      />
    </>
  );
};

export default AdminAccountPage;
