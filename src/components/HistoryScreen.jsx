import styled from "styled-components";

import Container from "./layouts/Container";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";

function HistoryScreen(){
    
    return(
        <Container>
            <Header/>
            <History>
                <h1>Histórico</h1>
                <h2>Em breve você poderá ver o histórico dos seus hábitos aqui!</h2>
                
            </History>
            <Footer/>
        </Container>       
    )
    
}

const History = styled.div`

    h2{
        font-size: 18px;
        line-height: 22px;
        color: #666666;
        margin-top: 17px;
    }
    
`;

export default HistoryScreen;

