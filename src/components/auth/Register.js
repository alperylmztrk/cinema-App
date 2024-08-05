import React, { useEffect, useState } from "react";
import { Input, Button, Snackbar } from "@mui/joy";
import "./styleLogin.css";

import { request } from "../../helpers/axios_helper";

function Register() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [color, setColor] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = (event) => {
    event.preventDefault(); // sayfa yenilenmesin
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    formJson.authorities = ["ROLE_USER"];
    request("POST", "/user", formJson)
      .then((response) => {
        if (response.status == 200) {
          setOpen(true);
          setUsername(formJson["username"]);
          setMessage("Kayıt Başarılı Kullanıcı adı: " + formJson["username"]);
          setColor("success");
        }
        console.log(response.data);
      })
      .catch((error) => {
        console.log("hataaa  " + error);
        console.log(error.response.data);
        setOpen(true);
        setMessage("Kayıt Başarısız! " + error.response.data.message);
        setColor("danger");
      });
  };

  return (
    <div className="container">
      <div className="heading"> Kayıt Ol</div>
      <form className="form" onSubmit={submitHandler}>
        <Input
          className="input"
          placeholder="Ad"
          name="name"
          size="sm"
          type="text"
          variant="plain"
          required
        ></Input>
        <Input
          className="input"
          placeholder="Soyad"
          name="surname"
          size="sm"
          type="text"
          variant="plain"
          required
        ></Input>
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
          Kayıt Ol
        </Button>
      </form>

      <Snackbar
        open={open}
        autoHideDuration={5000}
        variant="solid"
        color={color}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={(event, reason) => {
          if (reason === "clickaway") {
            return;
          }
          setOpen(false);
        }}
      >
        {message}
      </Snackbar>
    </div>
  );
}

export default Register;
