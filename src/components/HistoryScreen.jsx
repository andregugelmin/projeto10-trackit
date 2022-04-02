import axios from "axios";
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
//import 'react-calendar/dist/Calendar.css';
import dayjs from "dayjs";

import UserContext from "./contexts/UserContext";
import Container from "./layouts/Container";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import CalendarStyle from "./CalendarStyle";

function HistoryScreen() {
	const { token, setNavigateTo } = useContext(UserContext);
	const API_URL =
		"https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily";

	const [apiHabits, setApiHabits] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		if (!token) {
			setNavigateTo("/history");
			navigate("/");
		} else {
			loadHabitsHistoryFromAPI();
		}
	}, []);

	function loadHabitsHistoryFromAPI() {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const promise = axios.get(API_URL, config);

		promise.then((response) => {
			setApiHabits(response.data);
		});
		promise.catch((err) => {
			alert(err.response.statusText);
		});
	}

	function setDayClass(date) {
		let dateFormated = dayjs(date).format("DD/MM/YYYY");
		let currentHabits = null;
		apiHabits.forEach((apiHabit) => {
			if (apiHabit.day === dateFormated) {
				currentHabits = apiHabit.habits;
			}
		});

		if (
			!currentHabits ||
			dayjs(date).format("DD/MM/YYYY") ===
				dayjs().locale("pt-br").format("DD/MM/YYYY")
		)
			return dayjs(date).format("DD");

		let habitsDone = currentHabits.filter((h) => h.done);

		if (habitsDone.length === currentHabits.length)
			return <p className="completed">{dayjs(date).format("DD")}</p>;
		else return <p className="incompleted">{dayjs(date).format("DD")}</p>;
	}

	return (
		<Container>
			<Header />
			<History>
				<h1>Histórico</h1>
				<CalendarStyle>
					<Calendar formatDay={(locale, date) => setDayClass(date)} />
				</CalendarStyle>
			</History>
			<Footer />
		</Container>
	);
}

const History = styled.div`
	h2 {
		font-size: 18px;
		line-height: 22px;
		color: #666666;
		margin-top: 17px;
	}
`;

export default HistoryScreen;
