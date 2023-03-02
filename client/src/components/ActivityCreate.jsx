import React, { useEffect, useState } from "react";
import {Link, useHistory} from "react-router-dom"
import {postActivity, getCountries} from "../actions/index"
import { useDispatch, useSelector} from "react-redux"
import styled from "styled-components"

const Temp = styled.div`
    color: white;
    padding-top: 200px;
    padding-right: 0px;
    padding-bottom: 0px;
    padding-left: 0px;
`
function validate(input){
    let errors = {valid: true}
    if (!input.name){
        errors.name = "You must add a name"
        errors.valid = false
    } 
    if (input.duration < 1 || input.duration > 24){
        errors.duration = "You must add a duration between 1 and 24"
        errors.valid = false
    }
    if (input.difficulty < 1 || input.difficulty > 5){
        errors.difficulty = "You must add a difficulty between 1 and 5"
        errors.valid = false
    }
    if (!input.season){
        errors.season = "You must select a season"
        errors.valid = false
    } 
    if (!input.country.length){
        errors.country = "You must add at least one country"
        errors.valid = false
    } 
    return errors
}
export default function ActivityCreate(){
    const dispatch =useDispatch()
    const countries = useSelector((state)=> state.countries)
    const history = useHistory()
    const [errors, setErrors] = useState({})
    const [input, setInput] =useState({
        name: "",
        duration: "",
        difficulty: "",
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
        const selectedCountry = e.target.value;
        if(selectedCountry){
        const hasCountry = input.country.find((x) => x === selectedCountry);
        const newCountries = hasCountry
            ? input.country.filter((x) => x !== selectedCountry)
            : [ ...input.country, selectedCountry ];

        setInput({
            ...input,
            country: newCountries
        })}
    }
    function handleSubmit(e) {
        e.preventDefault()
        const result = validate({...input})
        setErrors(result)
        if( result.valid){

            dispatch(postActivity(input))
            alert("Activity created successfully")
            setInput({
                name: "",
                duration: "",
                difficulty: "",
                season: "",
                country: []
            })
            history.push("/home")
        }
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
                        {errors.name && (
                            <p className="error">{errors.name}</p>
                        )}
                </div>
                <div>
                    <label>Duration:</label>
                    <input
                        type = "number"
                        value = {input.duration}
                        name = "duration"
                        onChange={handleChange}/>
                        {errors.duration && (
                            <p className="error">{errors.duration}</p>
                        )}
                </div>
                <div>
                    <label>Difficulty:</label>
                    <input
                        type = "number"
                        value = {input.difficulty}
                        name = "difficulty"
                        onChange={handleChange}/>
                        {errors.difficulty && (
                            <p className="error">{errors.difficulty}</p>
                        )}
                </div>
                <select onChange={(e) => handleSelect(e)}>
                    <option value = ""></option>
                    {countries.map((c) => (   
                        <option value = {c.name}> {c.name} </option>
                    ))}
                    {errors.countries && (
                            <p className="error">{errors.countries}</p>
                        )}
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
                        {errors.season && (
                            <p className="error">{errors.season}</p>
                        )}
                        <br/>
                <button type="submit">Submit</button>
            </form>
                </div>
            


        </Temp>
    )

}