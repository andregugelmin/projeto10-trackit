import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

import UserContext from "./contexts/UserContext";
import Container from "./layouts/Container";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import HabitToday from "./HabitToday";

function TodayScreen() {
	const API_URL =
		"https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";
	const { token, progress, setProgress } = useContext(UserContext);

	const [todayHabits, setTodayHabits] = useState([]);
	const [date, setDate] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	const navigate = useNavigate();

	useEffect(() => {
		checkAndSetPercentage();
		setIsLoading(false);
	}, [todayHabits]);

	useEffect(() => {
		if (!token) {
			navigate("/");
		} else {
			loadTodayHabitsFromAPI();
			setDate(getDate);
		}
	}, []);

	function loadTodayHabitsFromAPI() {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const promise = axios.get(API_URL, config);

		promise.then((response) => {
			const { data } = response;
			setTodayHabits(data);
		});
		promise.catch((err) => {
			alert(err.response.data.message);
		});
	}

	function getDate() {
		return dayjs().locale("pt-br").format("dddd, DD/MM");
	}

	function checkAndSetPercentage() {
		const totalHabitsToday = todayHabits.length;
		let habitsDone = 0;
		let todayPercentage = 0;
		todayHabits.forEach((habit) => {
			if (habit.done) habitsDone++;
		});
		if (totalHabitsToday > 0)
			todayPercentage = Math.floor((habitsDone / totalHabitsToday) * 100);
		if (todayPercentage !== progress) setProgress(todayPercentage);
	}

	function setSubtitle() {
		return progress === 0 ? (
			<h2>Nenhum hábito concluído ainda</h2>
		) : (
			<h2>{progress}% dos hábitos concluídos</h2>
		);
	}

	const subtitle = setSubtitle();
	return (
		<Container>
			<Header />
			<Today percentage={progress}>
				<h1>{date}</h1>
				{subtitle}
				{todayHabits.map((habit) => (
					<HabitToday
						key={habit.id}
						habit={habit}
						loadHabits={loadTodayHabitsFromAPI}
						token={token}
					/>
				))}
			</Today>
			<Footer />
		</Container>
	);
}

function setColor(percentage) {
	if (percentage > 0) return "#8FC549";
	else return "#BABABA;";
}

const Today = styled.div`
	h2 {
		font-size: 18px;
		line-height: 22px;
		color: ${({ percentage }) => setColor(percentage)};
	}
`;

export default TodayScreen;
