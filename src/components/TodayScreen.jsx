import axios from "axios";
import {useState, useEffect, useContext} from "react";
import styled from "styled-components";

import UserContext from "./contexts/UserContext";
import Container from "./layouts/Container";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import HabitToday from "./HabitToday";
import { Link } from "react-router-dom";

function TodayScreen(){
    const { token, setToken } = useContext(UserContext);
    console.log(token);
    return(
        <Container>
            <Header/>
            <Today>
                <h1>Segunda, 17/05</h1>
                <h2>Nenhum hábito concluído ainda</h2>
                <HabitToday/>
                <HabitToday/>
                <HabitToday/>
            </Today>
            <Footer/>
        </Container>       
    )
    
}

const Today = styled.div`

    h2{
        font-size: 18px;
        line-height: 22px;
        color: #BABABA;
    }
    
`;

export default TodayScreen;

