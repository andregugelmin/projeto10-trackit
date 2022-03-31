import axios from "axios";
import {useState, useContext} from "react";

import { Link, useNavigate  } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

import UserContext from "./contexts/UserContext";
import Login from "./layouts/Login";
import logo from "../assets/imgs/logo-trackit.png"

function LoginScreen(){
    const { setToken, setUserImg } = useContext(UserContext);
    
    const API_URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login'
    
    const[isLoading, setIsLoading] = useState(false);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const navigate = useNavigate();

    function login(event){
        event.preventDefault();
        const loginData = {email: loginEmail, password: loginPassword};
        setIsLoading(true);
        const promise = axios.post(API_URL, loginData); 
        
        promise.then((response) => {  
            console.log(response.data);  
            setToken(response.data.token);
            setUserImg(response.data.image);
            
            navigate("/today");
            
        });
        promise.catch(err => {
            alert(err.response.statusText);
            setIsLoading(false);
        });
    }

    function setForm(){
        return !isLoading ? (
            <form onSubmit={login}>
                <input required type="text" placeholder="email" value={loginEmail} onChange={(e) =>{setLoginEmail(e.target.value)}}/>
                <input required type="password" placeholder="senha" value={loginPassword} onChange={(e) =>{setLoginPassword(e.target.value)}}/>
                <button type="submit">Entrar</button>
            </form>
        ) :
        (
            <form>
                <input disabled type="text" placeholder="email"/>
                <input disabled type="password" placeholder="senha"/>
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
            
            <Link to={`/register`}><p>Não tem uma conta? Cadastre-se</p></Link>
        </Login>
    )
    
}


export default LoginScreen;