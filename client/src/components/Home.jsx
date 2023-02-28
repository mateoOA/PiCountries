import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux"
import {getCountries} from "../actions"
import { Link } from "react-router-dom";
import Card from "./Card";
import styled from "styled-components"

const Section = styled.section`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 50px;
    margin: 0 auto;
    width: 90vw;
`
const Dropdown =styled.div`

`

export default function Home () {
    const dispatch = useDispatch()
    const allCountries = useSelector((state)=> state.countries) /* useSelector trae y guarda en allCountries todo lo que esta en el estado de countries */
    useEffect(() =>  {
        
        dispatch(getCountries())
    },[dispatch])

    function handleClick(e){
        e.preventDefault()
        dispatch(getCountries())

    }

    return(
        <div>
            <Link to= "/activity"> crear actividad turistica</Link>
            <h1>Pi countries</h1>
            <button onClick={e=> {handleClick(e)}}>
                refresh
            </button>
            <Dropdown>
                <select>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                </select>
                <select>
                    <option value="Ascendant">Population ascendant</option>
                    <option value="Descendant">Population descendant</option>
                </select>
                <select>
                    <option value="Americas">American countries</option>
                    <option value="Africa">African countries</option>
                    <option value="Europe">European countries</option>
                    <option value="Oceania">Oceanic countries</option>
                    <option value="Asia">Asian countries</option>
                    <option value="Antartic">Antartica countries</option>
                </select>
                <Section>
                {
                   allCountries?.map(el=> ( /* el ? controla que si es undefined no se rompa */
                    
                    <Card name= {el.name} flag={el.flag} continent={el.continent}/>
                   ))
                }
                </Section>
            </Dropdown>

        </div>
    )

}