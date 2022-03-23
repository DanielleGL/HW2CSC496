// JavaScript source code
//from https://blog.devgenius.io/gatsby-js-render-data-from-wordpress-and-rest-api-70297e267caa

import React from "react"
export default function AllPokemon({ pageContext: { allPokemon } }) {
    return (
        <div>
            <ul>
                {allPokemon.map(pokemon => (
                    <li key={pokemon.id}>
                        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                        <p>{pokemon.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}