import { useRouteMatch } from "react-router-dom";
import { SidebarLink } from "../../../components/AccountUtilities";

const UserNavLinks = () => {
  const { url } = useRouteMatch();

  return (
    <>
      <SidebarLink
        url={`${url}`}
        iconType="solid"
        iconName="home"
        linkText="Inicio"
      />
      <SidebarLink
        url={`${url}/citas`}
        iconType="logo"
        iconName="baidu"
        linkText="Citas"
      />
      <SidebarLink
        url={`${url}/pedidos`}
        iconType="solid"
        iconName="cart"
        linkText="Pedidos"
      />
      <SidebarLink
        url={`${url}/cuenta`}
        iconType="solid"
        iconName="user"
        linkText="Cuenta"
      />
    </>
  );
};

export default UserNavLinks;
