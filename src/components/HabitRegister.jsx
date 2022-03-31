import { useState } from "react";
import styled from "styled-components";

function HabitRegister(props){
    const {setIsRegisteringHabit, habits, setHabits} = props;

    const [habitName, setHabitName] = useState("");
    const [days, setDays] = useState([{name: 'D', class: 'unselected'},
                    {name: 'S', class: 'unselected'},
                    {name: 'T', class: 'unselected'},
                    {name: 'Q', class: 'unselected'},
                    {name: 'Q', class: 'unselected'},
                    {name: 'S', class: 'unselected'},
                    {name: 'S', class: 'unselected'}]);

    function selectDay(index){
        let newDays = [...days];
        newDays[index].class === 'selected' ? newDays[index].class = 'unselected' : newDays[index].class = 'selected';
        setDays(newDays);
    }
        
    function saveNewHabit(){
        const newHabit = {
            name: habitName,
            days: days
        }

        setHabits([...habits, newHabit]);
        setIsRegisteringHabit(false);
    }

    return(
        <Register>
            <input type="text" placeholder="nome do habito" value={habitName} onChange={(e) => setHabitName(e.target.value)}/>
            <div className="days">
                {days.map((day, index) => <div key={index} onClick={()=>selectDay(index)} className={`day ${day.class}`}>{day.name}</div>)}
            </div>
            <div className="buttons">
                <p onClick={()=> setIsRegisteringHabit(false)}>Cancelar</p>
                <button onClick={saveNewHabit}>Salvar</button>
            </div>
            
        </Register>
    )
    
}

const Register = styled.div`
    width: 100%;
    height: 180px;
    background: #FFFFFF;
    border-radius: 5px;
    padding: 18px;

    input{
        width: 100%;
        height: 45px;
        left: 36px;
        top: 165px;
        padding-left: 11px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        box-sizing: border-box;
        border-radius: 5px;
        font-size: 20px;
        line-height: 25px;

    }

    input::placeholder{
        color: #DBDBDB;
    }

    .days{
        display: flex;
        margin-top: 8px;
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


    .buttons{
        display: flex;
        justify-content: flex-end;
        
    }

    .buttons p{
        font-size: 16px;
        line-height: 20px;
        color: #52B6FF;
        margin-right: 23px;
    }

    .buttons button{
        width: 84px;
        height: 35px;
        background: #52B6FF;
        border-radius: 5px;
        border: none;
        font-size: 16px;
        line-height: 20px;
        color: #FFFFFF;
        margin-top: 25px;
    }
`;

export default HabitRegister;