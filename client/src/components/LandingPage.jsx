import React from "react"
import {Link} from "react-router-dom"
import styled from "styled-components"

const Img = styled.img`
    width: 20%
`
const H1 = styled.h1`
    font-size: 100px;
    color: white;
    font-family: GOW, sans-serif;
`


export default function LandingPage(){
    return(
        <div>
            <H1>Pi Countries</H1>
            <Link to = "/home">
                <Img src= "Preview/util/botonPagina1.png" alt="" />
            </Link>
        </div>
    )
} 