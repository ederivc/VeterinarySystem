import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AccountPage from "../pages/AccountPage";
import AppointmentPage from "../pages/AppointmentPage";
import CartPage from "../pages/CartPage";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/Login/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AnimalsPage from "../pages/AnimalsPage";
import NotFoundPage from "../pages/NotFoundPage";
import Layout from "../layouts/Layout";

const AppRouter = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/registro" component={RegisterPage} />
          <Route exact path="/cuenta" component={AccountPage} />
          <Route exact path="/cita" component={AppointmentPage} />
          <Route exact path="/carrito" component={CartPage} />
          <Route exact path="/adquisicion" component={AnimalsPage} />

          <Route exact path="*" component={NotFoundPage} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default AppRouter;
