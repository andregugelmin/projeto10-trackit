import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {useContext} from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import UserContext from "../contexts/UserContext";


function Footer(){
    const { progress } = useContext(UserContext);

    const navigate = useNavigate();

    function goToday(){
      navigate("/today");
    }

    return(
        <Menu>
            <Link to={`/habits`} style={{ textDecoration: 'none' }}><p>Hábitos</p></Link>
            <span onClick={goToday} className="progress-bar">                
                <CircularProgressbar value={progress} text={"Hoje"} 
                background
                backgroundPadding={6}
                styles={{
                   path: {
                      stroke: `#FFFFFF`,
                      strokeLinecap: 'round',
                      transition: 'stroke-dashoffset 0.5s ease 0s',
                    },
                    trail: {
                      stroke: '#52B6FF'
                    },
                    text: {
                      fill: '#FFFFFF',
                      // Text size
                      fontSize: '18px',
                    },
                    // Customize background - only used when the `background` prop is true
                    background: {
                      fill: '#52B6FF',
                    },
                  }}
                />
            </span>
            <Link to={`/history`} style={{ textDecoration: 'none' }}><p>Histórico</p></Link>
        </Menu>
    )
    
}

const Menu = styled.div`
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    height: 70px;
    background: #FFFFFF;;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    

    p{
        font-size: 18px;
        line-height: 22px;
        color: #52B6FF;
    }

    .progress-bar{
        width: 91px;
        height: 91px;     
        margin-bottom: 40px;   
    }
    
`;

export default Footer;