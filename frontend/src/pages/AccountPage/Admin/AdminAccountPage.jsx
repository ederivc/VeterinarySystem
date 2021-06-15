import { useRouteMatch } from "react-router-dom";
import { SidebarLink } from "../../../components/AccountUtilities";

const AdminAccountPage = () => {
  const { url } = useRouteMatch();
  return (
    <>
      <SidebarLink
        url={`${url}`}
        iconType="solid"
        iconName="home"
        linkText="Inicio"
      />
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
        url={`${url}/admin/gestion/citas`}
        iconType="solid"
        iconName="book-content"
        linkText="Citas"
      />
      <SidebarLink
        url={`${url}/admin/gestion/productos`}
        iconType="solid"
        iconName="dashboard"
        linkText="Productos"
      />
      <SidebarLink
        url={`${url}/admin/gestion/animales`}
        iconType="solid"
        iconName="bone"
        linkText="Animales"
      />
    </>
  );
};

export default AdminAccountPage;
