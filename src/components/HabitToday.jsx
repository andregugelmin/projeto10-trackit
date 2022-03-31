import styled from "styled-components";

function HabitToday(){
    return(
        <Habit>
            <div>
                <h1>Ler 1 capítulo de livro</h1>
                <p>Sequência atual: 3 dias</p>
                <p>Seu recorde: 3 dias</p>
            </div>
            <div className="check unchecked">
                <ion-icon name="checkmark-sharp"></ion-icon>
            </div>           
        </Habit>
    )
}

const Habit = styled.div`
    margin-top: 28px;
    height: 94px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #FFFFFF;
    border-radius: 5px;
    padding-left: 15px;
    padding-right: 13px;

    h1{
        font-size: 20px;
        line-height: 25px;
        color: #666666;
    }
    p{
        font-size: 13px;
        line-height: 16px;
        color: #666666;
    }

    .check{
        width: 69px;
        height: 69px;
        border: 1px solid #E7E7E7;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .checked{
        background: #8FC549;
    }

    .unchecked{
        background: #EBEBEB;
    }
    
    .check ion-icon{
        color: #FFFFFF;
        font-size: 40px;
    }

    
`;

export default HabitToday;