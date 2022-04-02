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
	const [habitsList, setHabitList] = useState([]);

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

	function listHabits(date) {
		const dateFormated = dayjs(date).format("DD/MM/YYYY");
		let currentHabits = [];
		apiHabits.forEach((apiHabit) => {
			if (apiHabit.day === dateFormated) {
				currentHabits = apiHabit.habits;
			}
		});

		setHabitList(currentHabits);
	}

	function setHabitsHTML() {
		return habitsList.length > 0 ? (
			<div className="habits-list">
				{habitsList.map((habit, index) => (
					<div key={index} className="habits">
						<p className="habit-name">{habit.name}: </p>
						<p className={habit.done ? "habit-done" : "habit-not-done"}>
							{habit.done ? `Feito` : `Não feito`}
						</p>
					</div>
				))}
			</div>
		) : (
			<></>
		);
	}

	function setHabitsTitleHTML() {
		let habitDay = "";
		if (habitsList.length > 0) habitDay = habitsList[0].date;

		return habitsList.length > 0 ? (
			<h2>Hábitos do dia {dayjs(habitDay).locale("pt-br").format("DD/MM")}</h2>
		) : (
			<></>
		);
	}

	let habitsHTML = setHabitsHTML();
	let habitsTitle = setHabitsTitleHTML();
	return (
		<Container>
			<Header />
			<History>
				<h1>Histórico</h1>
				<CalendarStyle>
					<Calendar
						formatDay={(locale, date) => setDayClass(date)}
						onClickDay={(date) => listHabits(date)}
					/>
				</CalendarStyle>
				{habitsTitle}
				{habitsHTML}
			</History>
			<Footer />
		</Container>
	);
}

const History = styled.div`
	padding-bottom: 140px;

	h2 {
		font-size: 22px;
		line-height: 26px;
		color: #474747;
		margin-top: 25px;
	}

	.habits-list {
		margin-top: 10px;
		background: #ffffff;
		padding-top: 10px;
		padding-bottom: 20px;
		padding-left: 20px;
		box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.15);
	}

	.habits {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-top: 10px;
	}

	.habits-list p {
		margin-right: 20px;
		font-size: 18px;
	}

	.habit-name {
		color: #474747;
	}

	.habit-done {
		color: #73c00f;
	}

	.habit-not-done {
		color: #e01e1e;
	}
`;

export default HistoryScreen;
