import styled from "styled-components";

const Login = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	font-family: "Lexend Deca";
	background: #ffffff;

	h1 {
		font-family: "Playball", cursive;
		font-size: 70px;
		line-height: 86px;
		color: #126ba5;
		margin-bottom: 45px;
	}

	img {
		width: 155px;
		margin-top: 70px;
	}

	input {
		width: 303px;
		height: 45px;
		background: #ffffff;
		border: 1px double #d5d5d5;
		border-radius: 5px;
		padding-left: 11px;
		margin-bottom: 6px;

		font-size: 20px;
		line-height: 25px;
		color: #757171;
	}

	input::placeholder {
		color: #bdb9b9;
	}

	input:focus {
		outline: 1px outset #bdb9b9;
	}

	button {
		width: 303px;
		height: 45px;
		background: #52b6ff;
		border-radius: 5px;
		border: none;
		margin-bottom: 25px;

		font-size: 21px;
		line-height: 26px;
		color: #ffffff;
	}
	button:focus {
		outline: 1px solid #9e9b9b;
	}
	.load-button {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	p {
		font-size: 14px;
		line-height: 17px;
		text-decoration-line: underline;

		color: #52b6ff;
	}

	form {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
`;

export default Login;
