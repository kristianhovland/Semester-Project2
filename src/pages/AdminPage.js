import Heading from "../components/layout/Heading";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

export default function AdminPage() {
  const [auth] = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (!auth) {
      history.push("/login");
      localStorage.clear();
    }
  });

  return (
    <>
      <Heading content="Admin Dashboard" />
      <div className="adminButtons">
        <Link to="/">
          <Button className="AdminBtn" size="lg">
            Back to Homepage
          </Button>
        </Link>
        <Link to="/admin/add">
          <Button className="AdminBtn" size="lg">
            Add Article
          </Button>
        </Link>
        <Link to="/admin/edit">
          <Button className="AdminBtn" size="lg">
            Edit/Delete Article
          </Button>
        </Link>
      </div>
    </>
  );
}
