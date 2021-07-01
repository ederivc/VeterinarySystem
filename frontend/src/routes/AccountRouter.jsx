import { Switch, Route } from "react-router-dom";
import Products from "../pages/AccountPage/Admin/Registros/Productos/Products";
import RegisterUser from "../pages/AccountPage/Admin/Registros/Usuarios/RegisterUser";
import CitaAccountPage from "../pages/AccountPage/CitaAccountPage";
import WelcomeAccountPage from "../pages/AccountPage/WelcomeAccountPage";
import GestionsProducts from "../pages/AccountPage/Admin/Gestion/Productos/GestionsProducts";
import GestionUsuarios from "../pages/AccountPage/Admin/Gestion/Usuarios/GestionUsuarios";
import GestionCitas from "../pages/AccountPage/Admin/Gestion/Citas/GestionCitas";
import GestionCitasAprobadas from "../pages/AccountPage/Admin/Gestion/Citas/CitasAprobadas/GestionCitasAprobadas";
import RegisterCita from "../pages/AccountPage/Admin/Registros/Citas/RegisterCita";
import Pedidos from "../pages/AccountPage/User/Pedidos/Pedidos";
import UserAccount from "../pages/AccountPage/User/Account/UserAccount";
import GestionarPedidos from "../pages/AccountPage/Admin/Gestion/Pedidos/GestionarPedidos";

const AccountRouter = ({ path }) => {
  return (
    <Switch>
      <Route exact path={path}>
        <WelcomeAccountPage />
      </Route>
      <Route path={`${path}/citas`}>
        <CitaAccountPage />
      </Route>
      <Route path={`${path}/pedidos`}>
        <Pedidos />
      </Route>
      <Route path={`${path}/cuenta`}>
        <UserAccount />
      </Route>
      <Route path={`${path}/admin/registro/usuario`}>
        <RegisterUser />
      </Route>
      <Route path={`${path}/admin/registro/citas`}>
        <RegisterCita />
      </Route>
      <Route path={`${path}/admin/registro/productos`}>
        <Products />
      </Route>
      <Route path={`${path}/admin/gestion/usuario`}>
        <GestionUsuarios />
      </Route>
      <Route path={`${path}/admin/gestion/citas/pendientes`}>
        <GestionCitas />
      </Route>
      <Route path={`${path}/admin/gestion/citas/aprobadas`}>
        <GestionCitasAprobadas />
      </Route>
      <Route path={`${path}/admin/gestion/productos`}>
        <GestionsProducts />
      </Route>
      <Route path={`${path}/admin/gestion/pedidos`}>
        <GestionarPedidos />
      </Route>
    </Switch>
  );
};

export default AccountRouter;
