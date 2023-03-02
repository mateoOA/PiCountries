import React from "react";
import styled from "styled-components"

 const Pagina = styled.div`
 display: inline-block;
 `
 
export default function Paginado({countriesPerPage, allcountries, paginado}){
    const pageNumbers = []

    for(let i=1; i<=Math.ceil(allcountries/countriesPerPage); i++){
        pageNumbers.push(i)
    }
    return(
        <nav>
            <ul className="paginado" >
                {pageNumbers &&
                pageNumbers.map(number=>(
                    <Pagina className="number" key={number}>
                    <button onClick={() => paginado(number)}>{number} </button>
                    </Pagina>
                ))}
            </ul>
        </nav>
    )
}