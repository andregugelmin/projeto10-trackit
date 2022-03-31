import { useEffect, useState } from "react";
import styled from "styled-components";

function Habit(props){
    const {habit} = props;

    const [days, setDays] = useState([
        {name: 'D', class: 'unselected', number: 0},
        {name: 'S', class: 'unselected', number: 1},
        {name: 'T', class: 'unselected', number: 2},
        {name: 'Q', class: 'unselected', number: 3},
        {name: 'Q', class: 'unselected', number: 4},
        {name: 'S', class: 'unselected', number: 5},
        {name: 'S', class: 'unselected', number: 6}]);


    useEffect(() => {
        let selectedDays = [...days];
        selectedDays.map(day => {
            if(habit.days.includes(day.number)) day.class = 'selected';
        })   
        setDays(selectedDays);

        console.log(selectedDays);
    }, []);    
    
    return(
    <HabitElemet>
        <span className="habit-name">{habit.name}</span>
        <div className="days">
            {days.map((day, index)=> <div key={index} className={`day ${day.class}`}>{day.name}</div>)}
        </div>
        <ion-icon name="trash-outline"></ion-icon>
    </HabitElemet>
    )
}

const HabitElemet = styled.div`
    position: relative;
    background: #FFFFFF;
    border-radius: 5px;
    margin-top: 20px;
    height: 91px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding-left: 15px;
    
    .habit-name{
        font-size: 20px;
        line-height: 25px;
        color: #666666;
    }

    .days{
        display: flex;
    }

    .day{
        width: 30px;
        height: 30px;
        border-radius: 5px;
        font-size: 20px;
        line-height: 25px;
        margin-right: 4px;
        text-align: center;

    }

    .unselected{
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        color: #DBDBDB;
    }

    .selected{
        background: #CFCFCF;
        border: 1px solid #CFCFCF;
        color: #FFFFFF;
    }

    ion-icon{
        position: absolute;
        right: 15px;
        top: 15px;
        font-size: 20px;
    }
`;

export default Habit;