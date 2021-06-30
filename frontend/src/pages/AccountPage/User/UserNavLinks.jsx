import { useRouteMatch } from "react-router-dom";
import { SidebarLink } from "../../../components/AccountUtilities";

const UserNavLinks = () => {
  const { url } = useRouteMatch();

  return (
    <>
      <SidebarLink url={`${url}`} iconClass="bxs-home" linkText="Inicio" />
      <SidebarLink
        url={`${url}/citas`}
        iconClass="bxl-baidu"
        linkText="Citas"
      />
      <SidebarLink
        url={`${url}/pedidos`}
        iconClass="bxs-cart"
        linkText="Pedidos"
      />
      <SidebarLink
        url={`${url}/cuenta`}
        iconClass="bxs-user"
        linkText="Cuenta"
      />
    </>
  );
};

export default UserNavLinks;
