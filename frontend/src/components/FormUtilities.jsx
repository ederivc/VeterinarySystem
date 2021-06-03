import { Alert } from "react-bootstrap";

const Alerts = (message, variant) => {
  return <Alert variant={variant}>{message}</Alert>;
};

export { Alerts };
