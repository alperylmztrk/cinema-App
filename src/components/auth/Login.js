import * as React from "react";
import { Input, Button } from "@mui/joy";
import "./styleLogin.css";
import { useNavigate } from "react-router-dom";

import { request } from "../../helpers/axios_helper";
import { login } from "../../helpers/auth_helper";

function Login() {
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault(); // sayfa yenilenmesin
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    request("POST", "/auth/generate-token", formJson)
      .then((response) => {
        const data = response.data;
        login(data.token, data.roles, data.name, data.surname);
        console.log(response.data);
        window.dispatchEvent(new Event("storage"));
        navigate("/");
      })
      .catch((error) => {
        console.log("hataaa  " + error);
        console.log(error.response.data);
      });
  };

  return (
    <div className="container">
      <div className="heading"> Giriş Yap</div>
      <form className="form" onSubmit={submitHandler}>
        <Input
          className="input"
          placeholder="Kullanıcı Adı"
          name="username"
          size="sm"
          type="text"
          variant="plain"
          required
        ></Input>
        <Input
          className="input"
          placeholder="Parola"
          name="password"
          size="sm"
          type="password"
          variant="plain"
          required
        ></Input>
        <Button type="submit" size="sm" className="login-button">
          Giriş Yap
        </Button>
      </form>

      <span className="register">
        Hesabın yok mu? <a href="/register">Kaydol</a>
      </span>
    </div>
  );
}

export default Login;
