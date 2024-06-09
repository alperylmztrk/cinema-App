import { Box, FormControl, Grid, Typography, TextField, InputLabel, OutlinedInput, InputBase } from "@mui/material";
import React, { useEffect, useState } from "react";
import './styleLogin.css';

function Login() {

    function signIn(formData) {
        const username = formData.get("username");
        const password = formData.get("password");
        alert("kullanıcı adı: " + username + " parola: " + password)
    }


    return (
        <div style={{display:"flex"}}> 
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

                <span className="register">Hesabın yok mu? <a href="/register">Kaydol</a></span>
            </div>

            <div className="container">
                <div className="heading"> Giriş Yap</div>
                <FormControl className="form" >

                    <InputBase className="input" placeholder="Kullanıcı Adı" size="small" type="text"></InputBase>
                    <InputBase className="input" placeholder="Parola" size="small" type="password" margin="normal"></InputBase>

                </FormControl>

            </div>


        </div>




    );

}


export default Login;