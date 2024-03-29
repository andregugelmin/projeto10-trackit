import axios from "axios";
import {useState, useEffect, useContext} from "react";
import styled from "styled-components";
import { useNavigate  } from "react-router-dom";

import UserContext from "./contexts/UserContext";
import Container from "./layouts/Container";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import HabitRegister from "./HabitRegister";
import Habit from "./Habit";

function HabitsScreen(){
    const { token, setNavigateTo } = useContext(UserContext);
    const API_URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits';


    const [isRegisteringHabit, setIsRegisteringHabit] = useState(false);
    const [habits, setHabits] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if(!token){
            setNavigateTo('/habits');
            navigate("/");
        }
        else loadHabitsFromAPI();
    }, []);


    function loadHabitsFromAPI(){
        const config = {
            headers: {
            Authorization: `Bearer ${token}`
            }
        }
        setIsLoading(true);
        const promise = axios.get(API_URL, config);

        promise.then(response => {
            const {data} = response;
            setHabits(data);
            setIsLoading(false);
        });
        promise.catch(err => {
            alert(err.response.statusText);
            setIsLoading(false);
        });
    }
    
    function reloadHabits(){
        setIsRegisteringHabit(false);
        loadHabitsFromAPI();
    }

    function setVisible() {
            return isRegisteringHabit ? (true) : (false);
    }

    function setHabitsList(){
        return (habits.length > 0) ? <>{habits.map((habit, index) => <Habit key={index} token={token} habit={habit} loadHabitsFromAPI={loadHabitsFromAPI}/>)}</>
        : <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
    }

    const visible = setVisible();
    const habitsList = setHabitsList();
    return(
        <Container>
            <Header/>
            <Habits>
                <div className="top">
                    <h1>Meus hábitos</h1>
                    <button onClick={() => {if(!isRegisteringHabit) setIsRegisteringHabit(true)}}>+</button>
                </div>
                <HabitRegister visible={visible} token={token} setIsRegisteringHabit={setIsRegisteringHabit} isLoading={isLoading} setIsLoading={setIsLoading} reloadHabits={reloadHabits}/>
                {habitsList}
            </Habits>
            <Footer/>
        </Container>       
    )
    
}

const Habits = styled.div`

    padding-bottom: 140px;

    .top{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .top button{
        width: 40px;
        height: 35px;
        background: #52B6FF;
        border: none;
        border-radius: 5px;
        font-size: 25px;
        line-height: 34px;
        color: #FFFFFF;
    }

    p{        
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        color: #666666;
        margin-top: 28px;
    }
`;

export default HabitsScreen;

