import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import './styleLogin.css';

function Login() {


    return (
        <div className="login">
            <div className="box">
                <form>
                    <h2>Giriş Yap</h2>
                    <div className="inputBox">
                        <input type="text" required></input>
                        <span>Kullanıcı Adı</span>
                        <i></i>
                    </div>
                    <div className="inputBox">
                        <input type="password" required></input>
                        <span>Parola</span>
                        <i></i>
                    </div>
                    <div className="links">
                        <a href="#">Şifremi unuttum</a>
                        <a href="/register">Kayıt ol</a>
                    </div>
                    <input type="submit" value="Giriş yap"></input>
                </form>

            </div >
        </div >
    );

}


export default Login;