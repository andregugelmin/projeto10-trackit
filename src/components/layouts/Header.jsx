import styled from "styled-components";
import { useContext } from "react";

import UserContext from "../contexts/UserContext";

function Header() {
	const { userImg } = useContext(UserContext);

	return (
		<Title>
			<h1>TrackIt</h1>
			<img src={userImg} alt="Profile" />
		</Title>
	);
}

const Title = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	height: 70px;
	background: #126ba5;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-left: 18px;
	padding-right: 18px;
	z-index: 1;

	h1 {
		font-family: "Playball", cursive;
		font-size: 40px;
		line-height: 49px;
		color: #ffffff;
	}

	img {
		width: 51px;
		height: 51px;
		border-radius: 98.5px;
		object-fit: cover;
	}
`;

export default Header;
