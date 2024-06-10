import {
  Box,
  FormControl,
 
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {Input, Button} from "@mui/joy";
import "./styleLogin.css";

function Login() {
  function signIn(formData) {
    const username = formData.get("username");
    const password = formData.get("password");
    alert("kullanıcı adı: " + username + " parola: " + password);
  }

  return (
    <div style={{ display: "flex" }}>
      <div className="container">
        <div className="heading"> Giriş Yap</div>
        <form className="form" action={signIn}>
          <input
            placeholder="Kullanıcı Adı"
            id="username"
            name="username"
            type="text"
            className="input"
            required
          />
          <input
            placeholder="Parola"
            id="password"
            name="password"
            type="password"
            className="input"
            required
          />

          <input value="Giriş Yap" type="submit" className="login-button" />
        </form>

        <span className="register">
          Hesabın yok mu? <a href="/register">Kaydol</a>
        </span>
      </div>

      <div className="container">
        <div className="heading"> Giriş Yap</div>
        <FormControl className="form">
          <Input
            className="input2"
            placeholder="Kullanıcı Adı"
            size="sm"
            type="text"
            variant="plain"
          ></Input>
          <Input
            className="input2"
            placeholder="Parola"
            size="sm"
            type="password"
            variant="plain"
          ></Input>
          <Button type="submit" size="sm" className="login-button">Giriş Yap</Button>
        </FormControl>
      </div>
    </div>
  );
}

export default Login;
