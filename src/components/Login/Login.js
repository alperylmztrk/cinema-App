import { Box, FormControl, Stack } from "@mui/material";
import * as React from 'react';
import { Input, Button } from "@mui/joy";
import "./styleLogin.css";

function Login() {

  return (
    <div className="container">
      <div className="heading"> Giriş Yap</div>
      <form className="form" onSubmit={(event)=> {
        event.preventDefault();
        const formData= new FormData(event.currentTarget);
        const formJson=Object.fromEntries(formData.entries())
        alert(JSON.stringify(formJson)+ formJson["username"])
      }}>
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
