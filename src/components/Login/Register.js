import { Box, FormControl } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Input, Button } from "@mui/joy";
import "./styleLogin.css";

function Register() {
  return (
    <div className="container">
      <div className="heading"> Kayıt Ol</div>
      <FormControl className="form">
      <Input
          className="input"
          placeholder="Ad"
          size="sm"
          type="text"
          variant="plain"
        ></Input>
          <Input
          className="input"
          placeholder="Soyad"
          size="sm"
          type="text"
          variant="plain"
        ></Input>
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
          Kayıt Ol
        </Button>
      </FormControl>

    </div>
  );
}

export default Register;
