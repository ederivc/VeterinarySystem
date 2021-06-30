import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppointmentPage from "../pages/Citas/AppointmentPage";
import CartPage from "../pages/CartPage/CartPage";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/Login/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import Layout from "../layouts/Layout";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import AdminPage from "../pages/Admin/AdminPage";
import PrivateRoute from "./PrivateRoute";
import BaseAccountPage from "../components/BaseAccountPage";
import RegisterPage from "../pages/Register/RegisterPage";

const AppRouter = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/registro" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} />
          <PrivateRoute path="/cuenta" component={BaseAccountPage} />
          <Route exact path="/cita" component={AppointmentPage} />
          <Route exact path="/carrito" component={CartPage} />
          <Route exact path="/productos" component={ProductsPage} />
          <PrivateRoute exact path="/admin" component={AdminPage} />

          <Route exact path="*" component={NotFoundPage} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default AppRouter;
