import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

function Habit(props) {
	const { token, habit, loadHabitsFromAPI } = props;

	const [days, setDays] = useState([
		{ name: "D", class: "unselected", number: 0 },
		{ name: "S", class: "unselected", number: 1 },
		{ name: "T", class: "unselected", number: 2 },
		{ name: "Q", class: "unselected", number: 3 },
		{ name: "Q", class: "unselected", number: 4 },
		{ name: "S", class: "unselected", number: 5 },
		{ name: "S", class: "unselected", number: 6 },
	]);

	useEffect(() => {
		let selectedDays = [...days];
		selectedDays.forEach((day) => {
			if (habit.days.includes(day.number)) day.class = "selected";
		});
		setDays(selectedDays);
	}, []);

	function deleteHabit() {
		const API_URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}`;
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const promise = axios.delete(API_URL, config);

		promise.then((response) => {
			loadHabitsFromAPI();
		});
		promise.catch((err) => {
			alert(err.response.data.message);
		});
	}

	function checkDelete() {
		if (window.confirm("Deseja mesmo deletar?")) {
			deleteHabit();
		}
	}

	return (
		<HabitElemet>
			<span className="habit-name">{habit.name}</span>
			<div className="days">
				{days.map((day, index) => (
					<div key={index} className={`day ${day.class}`}>
						{day.name}
					</div>
				))}
			</div>
			<ion-icon onClick={checkDelete} name="trash-outline"></ion-icon>
		</HabitElemet>
	);
}

const HabitElemet = styled.div`
	position: relative;
	background: #ffffff;
	border-radius: 5px;
	margin-top: 20px;
	height: 91px;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	padding-left: 15px;
	box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.15);

	.habit-name {
		font-size: 20px;
		line-height: 25px;
		color: #666666;
	}

	.days {
		display: flex;
	}

	.day {
		width: 30px;
		height: 30px;
		border-radius: 5px;
		font-size: 20px;
		line-height: 25px;
		margin-right: 4px;
		text-align: center;
	}

	.unselected {
		background: #ffffff;
		border: 1px solid #d5d5d5;
		color: #c5c5c5;
		box-shadow: 0px -1px 1px rgba(0, 0, 0, 0.25);
	}

	.selected {
		background: #cfcfcf;
		border: 1px solid #cfcfcf;
		color: #ffffff;
		box-shadow: 0px -1px 1px rgba(0, 0, 0, 0.25);
	}

	ion-icon {
		position: absolute;
		right: 15px;
		top: 15px;
		font-size: 20px;
	}
`;

export default Habit;
