import { Box, FormControl } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Input, Button } from "@mui/joy";
import "./styleLogin.css";

function Login() {
  function signIn(formData) {
    const username = formData.get("username");
    const password = formData.get("password");
    alert("kullanıcı adı: " + username + " parola: " + password);
  }

  return (
    <div className="container">
      <div className="heading"> Giriş Yap</div>
      <FormControl className="form" >
        <Input
          className="input"
          placeholder="Kullanıcı Adı"
          size="sm"
          type="text"
          variant="plain"
        ></Input>
        <Input
          className="input"
          placeholder="Parola"
          size="sm"
          type="password"
          variant="plain"
        ></Input>
        <Button type="submit" size="sm" className="login-button">
          Giriş Yap
        </Button>
      </FormControl>
      <span className="register">
        Hesabın yok mu? <a href="/register">Kaydol</a>
      </span>
    </div>
  );
}

export default Login;
