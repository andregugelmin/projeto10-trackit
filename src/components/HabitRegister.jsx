import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";

function HabitRegister(props) {
	const {
		visible,
		token,
		setIsRegisteringHabit,
		isLoading,
		setIsLoading,
		reloadHabits,
	} = props;
	const API_URL =
		"https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";

	const [habitName, setHabitName] = useState("");
	const cleanDays = [
		{ name: "D", class: "unselected", number: 0 },
		{ name: "S", class: "unselected", number: 1 },
		{ name: "T", class: "unselected", number: 2 },
		{ name: "Q", class: "unselected", number: 3 },
		{ name: "Q", class: "unselected", number: 4 },
		{ name: "S", class: "unselected", number: 5 },
		{ name: "S", class: "unselected", number: 6 },
	];
	const [days, setDays] = useState(cleanDays);

	function selectDay(index) {
		if (!isLoading) {
			let newDays = [...days];
			newDays[index].class === "selected"
				? (newDays[index].class = "unselected")
				: (newDays[index].class = "selected");
			setDays(newDays);
		}
	}

	function saveNewHabit() {
		let habitDays = [];
		days.forEach((day) => {
			if (day.class === "selected") habitDays.push(day.number);
		});
		const newHabit = {
			name: habitName,
			days: [...habitDays],
		};

		setIsLoading(true);

		if (newHabit.name.length === 0) {
			alert("De um nome para o hábito");
			setIsLoading(false);
		} else if (newHabit.days.length === 0) {
			alert("Selecione pelo menos um dia para o hábito");
			setIsLoading(false);
		} else {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};

			const promise = axios.post(API_URL, newHabit, config);

			promise.then((response) => {
				setDays(cleanDays);
				setHabitName("");
				reloadHabits();
			});
			promise.catch((err) => {
				alert(err.response.statusText);
				setIsLoading(false);
			});
		}
	}

	function setButton() {
		return isLoading ? (
			<button className="load-button">
				<ThreeDots color="#FFFFFF" height={35} width={35} />
			</button>
		) : (
			<button onClick={saveNewHabit}>Salvar</button>
		);
	}

	function setInput() {
		return isLoading ? (
			<input
				type="text"
				placeholder="nome do habito"
				value={habitName}
				disabled
			/>
		) : (
			<input
				type="text"
				placeholder="nome do habito"
				value={habitName}
				onChange={(e) => setHabitName(e.target.value)}
			/>
		);
	}

	const input = setInput();
	const btn = setButton();
	return visible ? (
		<Register>
			{input}
			<div className="days">
				{days.map((day, index) => (
					<div
						key={index}
						onClick={() => selectDay(index)}
						className={`day ${day.class}`}
					>
						{day.name}
					</div>
				))}
			</div>
			<div className="buttons">
				<p onClick={() => setIsRegisteringHabit(false)}>Cancelar</p>
				{btn}
			</div>
		</Register>
	) : (
		<></>
	);
}

const Register = styled.div`
	width: 100%;
	height: 180px;
	background: #ffffff;
	border-radius: 5px;
	padding: 18px;

	input {
		width: 100%;
		height: 45px;
		left: 36px;
		top: 165px;
		padding-left: 11px;
		background: #ffffff;
		border: 1px solid #d5d5d5;
		box-sizing: border-box;
		border-radius: 5px;
		font-size: 20px;
		line-height: 25px;
		color: #8a8a8a;
	}

	input::placeholder {
		color: #c9c9c9;
	}
	input:focus {
		outline: 1px solid #bdb9b9;
	}

	.days {
		display: flex;
		margin-top: 8px;
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
		color: #dbdbdb;
	}

	.selected {
		background: #cfcfcf;
		border: 1px solid #cfcfcf;
		color: #ffffff;
	}

	.buttons {
		display: flex;
		justify-content: flex-end;
	}

	.buttons p {
		font-size: 16px;
		line-height: 20px;
		color: #52b6ff;
		margin-right: 23px;
	}

	.buttons button {
		width: 84px;
		height: 35px;
		background: #52b6ff;
		border-radius: 5px;
		border: none;
		font-size: 16px;
		line-height: 20px;
		color: #ffffff;
		margin-top: 25px;
	}

	.load-button {
		display: flex;
		align-items: center;
		justify-content: center;
	}
`;

export default HabitRegister;
