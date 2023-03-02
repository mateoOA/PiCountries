import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountryName } from "../actions";
import styled from "styled-components"

const DivStyle = styled.div`
    padding-top: 10px;
    padding-right: 0px;
    padding-bottom: 15px;
    padding-left: 0px;
`

export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)

    }
    function handleSubmit(e){
        e.preventDefault()
        dispatch(getCountryName(name))
    }

    return(
        <DivStyle>
            <input
            type = "text"
            placeholder = "Search country"
            onChange={(e)=> handleInputChange(e)}/>
            <button type= "submit" onClick={(e) => handleSubmit(e)}> search</button>
        </DivStyle>
    )
}