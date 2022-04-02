import axios from "axios";
import styled from "styled-components";

function HabitToday(props) {
	const { habit, loadHabits, token } = props;

	function checkHabit() {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		let API_URL = "";

		if (!habit.done) {
			API_URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/check`;
		} else {
			API_URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/uncheck`;
		}

		const promise = axios.post(API_URL, {}, config);

		promise.then((response) => {
			loadHabits();
		});
		promise.catch((err) => {
			console.log(err.response.data.message);
		});
	}

	return (
		<Habit
			checked={habit.done}
			current={habit.currentSequence}
			highest={habit.highestSequence}
		>
			<div>
				<h1>{habit.name}</h1>
				<p className="current-sequence">
					Sequência atual: {habit.currentSequence} dias
				</p>
				<p className="highest-sequence">
					Seu recorde: {habit.highestSequence} dias
				</p>
			</div>
			<ion-icon onClick={checkHabit} name="checkbox"></ion-icon>
		</Habit>
	);
}

function colorIcon(checked) {
	if (checked) return "#8FC549";
	else return "#EBEBEB";
}

function colorText(checked) {
	if (checked) return "#8FC549";
	else return "#666666;";
}

function colorHighest(checked, current, highest) {
	if (checked && current === highest) return "#8FC549";
	else return "#666666;";
}

const Habit = styled.div`
	margin-top: 28px;
	height: 94px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: #ffffff;
	border-radius: 5px;
	padding-left: 15px;
	padding-right: 13px;

	h1 {
		font-size: 20px;
		line-height: 25px;
		color: #666666;
	}
	p {
		font-size: 13px;
		line-height: 16px;
	}

	.current-sequence {
		color: ${({ checked }) => colorText(checked)};
	}

	.highest-sequence {
		color: ${({ checked, current, highest }) =>
			colorHighest(checked, current, highest)};
	}

	ion-icon {
		font-size: 69px;
		color: ${({ checked }) => colorIcon(checked)};
	}
`;

export default HabitToday;
