import styled from "styled-components";

const Login = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Lexend Deca';
    background: #FFFFFF;

    h1{
        font-family: 'Playball', cursive;
        font-size: 70px;
        line-height: 86px;
        color: #126BA5;
        margin-bottom: 45px;
    }

    img{
        width: 155px;
        margin-top: 70px;
    }

    input{
        width: 303px;
        height: 45px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        padding-left: 11px;
        margin-bottom: 6px;

        font-size: 20px;
        line-height: 25px;
    }

    input::placeholder{
        color: #DBDBDB;
    }

    button{
        width: 303px;
        height: 45px;
        background: #52B6FF;
        border-radius: 5px;
        border: none;
        margin-bottom: 25px;

        font-size: 21px;
        line-height: 26px;
        color: #FFFFFF;
    }

    .load-button{
        display: flex;
        align-items: center;
        justify-content: center;
    }

    p{
        font-size: 14px;
        line-height: 17px;
        text-decoration-line: underline;

        color: #52B6FF;
    }

    form{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

export default Login;