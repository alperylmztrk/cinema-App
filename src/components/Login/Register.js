import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import './styleLogin.css';

function Register() {

    return (

        <div className="container">
            <div className="heading"> Kayıt Ol</div>
            <form className="form" action="">
                <input
                    placeholder="Ad"
                    id="name"
                    name="name"
                    type="text"
                    className="input"
                    required
                />
                <input
                    placeholder="Soyad"
                    id="surname"
                    name="surname"
                    type="text"
                    className="input"
                    required
                />
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

                <input value="Kayıt Ol" type="submit" className="login-button" />
            </form>

        </div>


    );


}


export default Register;