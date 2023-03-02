import React, { useEffect, useState } from "react";
import {Link, useHistory} from "react-router-dom"
import {postActivity, getCountries} from "../actions/index"
import { useDispatch, useSelector} from "react-redux"

export function ActivityCreate(){
    const dispatch =useDispatch()
    const activities = useSelector((state)=> state.activities)
    const [input, setInput] =useState({
        name: "",
        duration: "",
        dificulty: "",
        season: "",
        country: []
    })

    useEffect(() => {
        dispatch(getCountries());
    },[]);
    return(
        <div>

        </div>
    )

}