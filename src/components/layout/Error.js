import Alert from "react-bootstrap/Alert";

export default function ErrorMessage({ message }) {
  return <Alert variant="danger">{message}</Alert>;
}