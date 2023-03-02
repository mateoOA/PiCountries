import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components"

const Div = styled.div`
    background-color: #BFB6B6;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px;
    border-radius: 50px;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
        transform: scale(1.02)
    }
`
const CardData = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 50%;
`

const TextDiv = styled.div`
    font-family: typeWritter, sans-serif;
    display: flex;
    flex-direction: column;
`
const Title = styled.p`
    font-size: 18px;
    text-decoration: underline;
    margin: 0;
`
const Content = styled.p`
    font-size: 28px;
    margin: 0;
`
const Img =styled.img`
    width: 50%;
    height: 192px;
    object-fit: contain;
`

export default function Card({name, continent, flag, id}){
    return (
        <Link to={`/countries/${id}`} >
            <Div>
                <Img src={flag} alt="img"/>
                <CardData>
                    <TextDiv>
                        <Title>Country:</Title>
                        <Content>{name}</Content>
                    </TextDiv>
                    <TextDiv>
                        <Title>Continent:</Title>
                        <Content>{continent}</Content>  
                    </TextDiv>
                </CardData>
            </Div>
        </Link>
    )
}