import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import './styleLogin.css';

function Register() {

    const style={
        height:550,
         '&::before':{
            height:550
         }
    };


    return (
        
        <div className="login">
            <div className="box r" style={style}>
                <form>
                    <h2>Kayıt Ol</h2>
                    <div className="inputBox">
                        <input type="text" required></input>
                        <span>Ad</span>
                        <i></i>
                    </div>
                    <div className="inputBox">
                        <input type="text" required></input>
                        <span>Soyad</span>
                        <i></i>
                    </div>
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

                    <div style={{ marginTop: '30px', display: "flex", justifyContent: 'center' }}>
                        <input type="submit" value="Kayıt Ol" ></input>
                    </div>




                </form>

            </div >
        </div >
    );

}


export default Register;