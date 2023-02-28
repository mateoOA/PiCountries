import React from "react";

export default function Card({name, continent, flag}){
    return (
        <div>
            <h2> {name}</h2>
            <h4> {continent}</h4>
            <img src={flag} alt="img"></img>
        </div>
    )
}