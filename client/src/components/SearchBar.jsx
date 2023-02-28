import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountryName } from "../actions";

export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setname] = useState("")

    function handleInputChange(e){
        e.preventDefault()
        setname(e.target.value)
        console.log(name)

    }
    function handleSubmit(e){
        e.preventDefault()
        dispatch(getCountryName(name))
    }

    return(
        <div>
            <input
            type = "text"
            placeholder = "Search country"
            onChange={(e)=> handleInputChange(e)}/>
            <button type= "submit" onClick={(e) => handleSubmit(e)}> search</button>
        </div>
    )
}