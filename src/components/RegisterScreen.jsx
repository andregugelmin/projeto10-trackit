import axios from "axios";
import {useState} from "react";  
import { Link , useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

import Login from "./layouts/Login";
import logo from "../assets/imgs/logo-trackit.png"

function RegisterScreen(){
    const API_URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up';

    const [registerEmail, setEmail] = useState('');
    const [registerPassword, setPassword] = useState('');
    const [registerName, setName] = useState('');
    const [registerImage, setImage] = useState('');

    const[isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    function sendToApi(event){
        event.preventDefault();
        const registerData = {email: registerEmail, password: registerPassword, name: registerName, image: registerImage};
        setIsLoading(true);
        const promise = axios.post(API_URL, registerData);

        promise.then((response) => {    
            navigate("/");
        });
        promise.catch(err => {
            alert(err.response.statusText);
            setIsLoading(false);
        });
    }

    function setForm(){
        return !isLoading ? (
            <form onSubmit={sendToApi}>
                <input required type="text" placeholder="email" value={registerEmail} onChange={(e) =>{setEmail(e.target.value)}}/>
                <input required type="password" placeholder="senha"  value={registerPassword} onChange={(e) =>{setPassword(e.target.value)}}/>
                <input required type="text" placeholder="nome"  value={registerName} onChange={(e) =>{setName(e.target.value)}}/>
                <input required type="url" placeholder="foto"  value={registerImage} onChange={(e) =>{setImage(e.target.value)}}/>
                <button type="submit">Cadastrar</button>
            </form>  
        ) :
        (
            <form>
                <input disabled type="text" placeholder="email" value={registerEmail} onChange={(e) =>{setEmail(e.target.value)}}/>
                <input disabled type="password" placeholder="senha"  value={registerPassword} onChange={(e) =>{setPassword(e.target.value)}}/>
                <input disabled type="text" placeholder="nome"  value={registerName} onChange={(e) =>{setName(e.target.value)}}/>
                <input disabled type="url" placeholder="foto"  value={registerImage} onChange={(e) =>{setImage(e.target.value)}}/>
                <button className="load-button"><ThreeDots color="#FFFFFF" height={50} width={50} /></button>
            </form>  
        )
    }

    const form = setForm();

    return(
        <Login>
            <img src={logo} alt="Logo TrackIt"/>
            <h1>TrackIt</h1>
            {form}                      
            <Link to={`/`}><p>Ja ter uma conta? Faça login!</p></Link>
        </Login>
    )
    
}


export default RegisterScreen;