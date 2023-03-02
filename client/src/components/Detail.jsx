import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";
import styled from "styled-components"


const Temp = styled.div`
background-color: #BFB6B6;
display: flex;
justify-content: space-between;
align-items: center;
padding-top: 200px;
    padding-right: 0px;
    padding-bottom: 0px;
    padding-left: 0px;
border-radius: 50px;
transition: 0.3s;
`

export default function Detail(props){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
        console.log(props.match.params.id)
    }, [dispatch])
    
    const myCountry = useSelector((state) => state.detail)

    return (
        <Temp>
            {myCountry ?
            <div>
                <h1>{myCountry.name}</h1>
                <img src= {myCountry.flag} alt="flag"/>
                <p>Region:{myCountry.continent}</p>
                <p>Capital:{myCountry.capital}</p>
                <p>Subregion:{myCountry.subRegion}</p>
                <p>Area:{myCountry.area}</p>
                <p>Population:{myCountry.population}</p>
                
            </div> : <p>Loading...</p>
            }
            <Link to="/home">
                <button>Return</button>
            </Link>
        </Temp>
    )
}