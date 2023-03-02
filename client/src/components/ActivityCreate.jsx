import React, { useEffect, useState } from "react";
import {Link, useHistory} from "react-router-dom"
import {postActivity, getCountries} from "../actions/index"
import { useDispatch, useSelector} from "react-redux"
import styled from "styled-components"

const Temp = styled.div`
    color: white;
`

export default function ActivityCreate(){
    const dispatch =useDispatch()
    const countries = useSelector((state)=> state.countries)
    const history = useHistory()
    const [input, setInput] =useState({
        name: "",
        duration: "",
        dificulty: "",
        season: "",
        country: []
    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }
    function handleCheck(e){
        if (e.target.checked){
            setInput({
                ...input,
                season: e.target.id
            })
        }
    }
    function handleSelect(e){
        setInput({
            ...input,
            country: [ ...input.country, e.target.value]
        })
        console.log(input.country)
    }
    function handleSubmit(e) {
        e.preventDefault()
        console.log(input)
        dispatch(postActivity(input))
        alert("Activity created successfully")
        setInput({
            name: "",
            duration: "",
            dificulty: "",
            season: "",
            country: []
        })
        history.push("/home")
    }

    useEffect(() => {
        dispatch(getCountries());
    },[]);
    return(
        <Temp>
            <Link to= "/home"><button>Return</button></Link>
            <h1>Create activity</h1>
        
            <form id = "form1">
                <div>
                    <label>Name:</label>
                    <input 
                        type = "text"
                        value = {input.name}
                        name = "name"
                        onChange={handleChange}/>
                </div>
                <div>
                    <label>Duration:</label>
                    <input
                        type = "number"
                        value = {input.duration}
                        name = "duration"
                        onChange={handleChange}/>
                </div>
                <div>
                    <label>Dificulty:</label>
                    <input
                        type = "number"
                        value = {input.dificulty}
                        name = "dificulty"
                        onChange={handleChange}/>
                </div>
                <select onChange={(e) => handleSelect(e)}>
                    {countries.map((c) => (
                        <option value = {c.name}> {c.name} </option>
                    ))}
                </select>
                <ul>
                    <li>{input.country.map(e => e + " ,")}</li>
                </ul>
            </form>
            <div>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <input
                    type = "radio"
                    id = "summer"
                    name="season"
                    onChange={(e) => handleCheck(e)}
                    value = {input.season}/>
                        <label htmlFor = "summer">Summer</label>
                <input 
                    type = "radio"
                    id = "autumn"
                    name="season"
                    onChange={(e) => handleCheck(e)}
                    value = {input.season}/>
                        <label htmlFor = "autumn">Autumn</label>
                <input 
                    type = "radio"
                    id = "winter"
                    name="season"
                    onChange={(e) => handleCheck(e)}
                    value = {input.season}/>
                        <label htmlFor = "winter">Winter</label>
                <input 
                    type = "radio"
                    id = "spring"
                    name="season"
                    onChange={(e) => handleCheck(e)}
                    value = {input.season}/>
                        <label htmlFor = "spring">Spring</label>
                        <br/>
                <button type="submit">Submit</button>
            </form>
                </div>
            


        </Temp>
    )

}