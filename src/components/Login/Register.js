import { Box, FormControl } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Input, Button } from "@mui/joy";
import "./styleLogin.css";

function Register() {
  return (
    <div className="container">
      <div className="heading"> Kayıt Ol</div>
      <form className="form" onSubmit={(event)=> {
        event.preventDefault();
        const formData= new FormData(event.currentTarget);
        const formJson=Object.fromEntries(formData.entries())
        alert(JSON.stringify(formJson)+ formJson["username"])
      }}>
     
      <Input
          className="input"
          placeholder="Ad"
          name="name"
          size="sm"
          type="text"
          variant="plain"
        ></Input>
          <Input
          className="input"
          placeholder="Soyad"
          name="surname"
          size="sm"
          type="text"
          variant="plain"
        ></Input>
        <Input
          className="input"
          placeholder="Kullanıcı Adı"
          name="username"
          size="sm"
          type="text"
          variant="plain"
        ></Input>
        <Input
          className="input"
          placeholder="Parola"
          name="username"
          size="sm"
          type="password"
          variant="plain"
        ></Input>
        <Button type="submit" size="sm" className="login-button">
          Kayıt Ol
        </Button>
   </form>

    </div>
  );
}

export default Register;
