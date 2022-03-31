import styled from "styled-components";
import PH from "../../assets/imgs/placeholder.svg";

function Header(){
    return(
        <Title>
            <h1>TrackIt</h1>
            <img src={PH} alt="Profile Image"/>
        </Title>
    )
    
}

const Title = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    height: 70px;
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 18px;
    padding-right: 18px;
    z-index: 1;
    
    h1{
        font-family: 'Playball', cursive;
        font-size: 40px;
        line-height: 49px;
        color: #FFFFFF;
        
    }

    img{
        width: 51px;
        height: 51px;
        border-radius: 98.5px;
    }
`;

export default Header;
