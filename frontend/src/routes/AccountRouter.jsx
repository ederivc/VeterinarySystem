import { Switch, Route } from "react-router-dom";
import Products from "../pages/AccountPage/Admin/Registros/Productos/Products";
import RegisterAnimal from "../pages/AccountPage/Admin/Registros/Animals/RegisterAnimal";
import RegisterUser from "../pages/AccountPage/Admin/Registros/Usuarios/RegisterUser";
import CitaAccountPage from "../pages/AccountPage/CitaAccountPage";
import WelcomeAccountPage from "../pages/AccountPage/WelcomeAccountPage";
import GestionsProducts from "../pages/AccountPage/Admin/Gestion/Productos/GestionsProducts";
import GestionUsuarios from "../pages/AccountPage/Admin/Gestion/Usuarios/GestionUsuarios";
import GestionCitas from "../pages/AccountPage/Admin/Gestion/Citas/GestionCitas";
import GestionCitasAprobadas from "../pages/AccountPage/Admin/Gestion/Citas/CitasAprobadas/GestionCitasAprobadas";

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
        <WelcomeAccountPage />
      </Route>
      <Route path={`${path}/admin/registro/usuario`}>
        <RegisterUser />
      </Route>
      <Route path={`${path}/admin/registro/citas`}>
        <h1>Cita</h1>
      </Route>
      <Route path={`${path}/admin/registro/productos`}>
        <Products />
      </Route>
      <Route path={`${path}/admin/registro/animales`}>
        <RegisterAnimal />
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
      <Route path={`${path}/admin/gestion/animales`}>
        <h1>Gestion animal</h1>
      </Route>
    </Switch>
  );
};

export default AccountRouter;
