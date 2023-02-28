import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux"
import {getCountries, filterByContinent} from "../actions"
import { Link } from "react-router-dom";
import Card from "./Card";
import styled from "styled-components"
import SearchBar from "./SearchBar";

const Section = styled.section`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 50px;
    margin: 0 auto;
    width: 90vw;
`
const Dropdown = styled.div`
    padding: 30px;

    
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
function handlefiltercountry(e){
    dispatch(filterByContinent(e.target.value))
}
    return(
        <div>
            <Link to= "/activity"> crear actividad turistica</Link>
            <SearchBar/>
            <button onClick={e=> {handleClick(e)}}>
                refresh
            </button>
            <Dropdown>
                <select>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                    <option value="Ascendant">Population ascendant</option>
                    <option value="Descendant">Population descendant</option>
                </select>
                <select onChange={e=>handlefiltercountry(e)}>
                    <option value="All">All countries</option>
                    <option value="Americas">American countries</option>
                    <option value="Africa">African countries</option>
                    <option value="Europe">European countries</option>
                    <option value="Oceania">Oceanic countries</option>
                    <option value="Asia">Asian countries</option>
                    <option value="Antarctic">Antartica countries</option>
                </select>
                <select>
                <option value="All">All Season Activities</option>
                <option value="summer">Summer Activities</option>
                <option value="autumn">Autumn Activities</option>
                <option value="winter">Winter Activities</option>
                <option value="spring">Spring Activities</option>
                </select>
            </Dropdown>
            <Section>
                {
                   allCountries?.map(el=> ( /* el ? controla que si es undefined no se rompa */
                    
                    <Card name= {el.name} flag={el.flag} continent={el.continent}/>
                   ))
                }
                </Section>

        </div>
    )

}