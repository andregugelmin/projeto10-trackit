import axios from "axios";
import { useState, useContext } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots, BallTriangle } from "react-loader-spinner";

import UserContext from "./contexts/UserContext";
import Login from "./layouts/Login";
import logo from "../assets/imgs/logo-trackit.png";

function LoginScreen() {
	const { setToken, setUserImg, navigateTo } = useContext(UserContext);

	const API_URL =
		"https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";

	const [isLoading, setIsLoading] = useState(true);
	const [isLogingIn, setIsLogingIn] = useState(true);
	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");

	const navigate = useNavigate();

	const localUserObj = localStorage.getItem("userData");

	if (localUserObj) {
		const userObjDeserialized = JSON.parse(localUserObj);
		sendUserObjToApi(userObjDeserialized);
	} else if (isLoading) {
		setIsLoading(false);
		setIsLogingIn(false);
	}

	function sendUserObjToApi(userObj) {
		const promise = axios.post(API_URL, userObj);

		promise.then((response) => {
			setToken(response.data.token);
			setUserImg(response.data.image);
			saveUserObjLocally(userObj);
			navigate(navigateTo);
		});
		promise.catch((err) => {
			alert(err.response.statusText);
			setIsLogingIn(false);
			setIsLoading(false);
		});
	}

	function login(event) {
		event.preventDefault();
		const loginData = { email: loginEmail, password: loginPassword };
		setIsLogingIn(true);
		sendUserObjToApi(loginData);
	}

	function saveUserObjLocally(userObj) {
		const userObjSerialized = JSON.stringify(userObj);
		localStorage.setItem("userData", userObjSerialized);
	}

	function setForm() {
		return !isLogingIn ? (
			<form onSubmit={login}>
				<input
					required
					type="text"
					placeholder="email"
					value={loginEmail}
					onChange={(e) => {
						setLoginEmail(e.target.value);
					}}
				/>
				<input
					required
					type="password"
					placeholder="senha"
					value={loginPassword}
					onChange={(e) => {
						setLoginPassword(e.target.value);
					}}
				/>
				<button type="submit">Entrar</button>
			</form>
		) : (
			<form>
				<input disabled type="text" placeholder="email" value={loginEmail} />
				<input
					disabled
					type="password"
					placeholder="senha"
					value={loginPassword}
				/>
				<button className="load-button">
					<ThreeDots color="#FFFFFF" height={50} width={50} />
				</button>
			</form>
		);
	}

	const form = setForm();

	return !isLoading ? (
		<Login>
			<img src={logo} alt="Logo TrackIt" />
			<h1>TrackIt</h1>
			{form}

			<Link to={`/register`}>
				<p>Não tem uma conta? Cadastre-se</p>
			</Link>
		</Login>
	) : (
		<Loading>
			<BallTriangle color="#52b6ff" radius={2} height={100} width={100} />
		</Loading>
	);
}

const Loading = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default LoginScreen;
