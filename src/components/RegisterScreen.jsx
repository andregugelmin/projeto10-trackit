import axios from "axios";
import {useState, useEffect} from "react";

import Login from "./layouts/Login";
import logo from "../assets/imgs/logo-trackit.png"
import { Link } from "react-router-dom";




function RegisterScreen(){
    const API_URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up';

    const [registerEmail, setEmail] = useState('');
    const [registerPassword, setPassword] = useState('');
    const [registerName, setName] = useState('');
    const [registerImage, setImage] = useState('');

    function sendToApi(){
        const registerData = {email: registerEmail, password: registerPassword, name: registerName, image: registerImage};
        console.log(registerData);
    }

    return(
        <Login>
            <img src={logo} alt="Logo TrackIt"/>
            <h1>TrackIt</h1>
            <input type="text" placeholder="email" value={registerEmail} onChange={(e) =>{setEmail(e.target.value)}}/>
            <input type="password" placeholder="senha"  value={registerPassword} onChange={(e) =>{setPassword(e.target.value)}}/>
            <input type="text" placeholder="nome"  value={registerName} onChange={(e) =>{setName(e.target.value)}}/>
            <input type="text" placeholder="foto"  value={registerImage} onChange={(e) =>{setImage(e.target.value)}}/>
            <button onClick={sendToApi}>Cadastrar</button>
            <Link to={`/`}><p>Ja ter uma conta? Faça login!</p></Link>
        </Login>
    )
    
}


export default RegisterScreen;