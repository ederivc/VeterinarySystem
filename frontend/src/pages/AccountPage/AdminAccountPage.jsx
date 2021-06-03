import { useRouteMatch } from "react-router-dom";
import { SidebarLink } from "../../components/AccountUtilities";

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
        iconName="home"
        linkText="Usuarios"
      />
      <SidebarLink
        url={`${url}/admin/registro/citas`}
        iconType="solid"
        iconName="home"
        linkText="Citas"
      />
      <SidebarLink
        url={`${url}/admin/registro/productos`}
        iconType="solid"
        iconName="home"
        linkText="Productos"
      />
      <SidebarLink
        url={`${url}/admin/registro/animales`}
        iconType="solid"
        iconName="home"
        linkText="Animales"
      />

      <h5>Gestionar</h5>
      <SidebarLink
        url={`${url}/admin/gestion/usuario`}
        iconType="solid"
        iconName="home"
        linkText="Animales"
      />
      <SidebarLink
        url={`${url}/admin/gestion/citas`}
        iconType="solid"
        iconName="home"
        linkText="Citas"
      />
      <SidebarLink
        url={`${url}/admin/gestion/productos`}
        iconType="solid"
        iconName="home"
        linkText="Productos"
      />
      <SidebarLink
        url={`${url}/admin/gestion/animales`}
        iconType="solid"
        iconName="home"
        linkText="Animales"
      />
    </>
  );
};

export default AdminAccountPage;
