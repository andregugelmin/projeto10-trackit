import axios from "axios";
import {useState, useEffect} from "react";

import Login from "./layouts/Login";
import logo from "../assets/imgs/logo-trackit.png"
import { Link } from "react-router-dom";

function LoginScreen(){
    return(
        <Login>
            <img src={logo} alt="Logo TrackIt"/>
            <h1>TrackIt</h1>
            <input type="text" placeholder="email"/>
            <input type="password" placeholder="senha"/>
            <button>Entrar</button>
            <Link to={`/register`}><p>Não tem uma conta? Cadastre-se</p></Link>
        </Login>
    )
    
}


export default LoginScreen;