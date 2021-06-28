import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import FormError from "react-bootstrap/Form";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';




const schema = yup.object().shape({
    username: yup.string().required("Please enter your username"),
    password: yup.string().required("Please enter your password"),
});

export default function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const history = useHistory();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const [auth, setAuth] = useContext(AuthContext);

    async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

      try {
        const response = 
        await axios.post("https://evening-stream-31739.herokuapp.com/auth/local", {
            identifier: data.username,
            password: data.password,
        });
        console.log("response", response.data);
	    	localStorage.setItem("Token", response.data.jwt);
        setAuth(response.data);
        history.push("/admin");

      } catch (error) {
      

        setLoginError(error.toString());
      } finally {
        setSubmitting(false);
      }
    }

  return (
    <>
     <Container className="LoginContainer">
      <Form onSubmit={handleSubmit(onSubmit)} className="loginContainer">
        {loginError && <FormError>{loginError}</FormError>}
        <fieldset disabled={submitting}>
        <Form.Label>Username:</Form.Label>
            <Form.Control name="username"  ref={register} />
            {errors.username && (
              <FormError>{errors.username.message}</FormError>
            )}
            <Form.Label>Password:</Form.Label>
            <Form.Control
              name="password"
              ref={register}
              type="password"
            />
            {errors.password && (
              <FormError>{errors.password.message}</FormError>
            )}
          <button>{submitting ? "You're now logging in." : "Login"}</button>
        </fieldset>
      </Form>
      </Container>
    </>
  );
}