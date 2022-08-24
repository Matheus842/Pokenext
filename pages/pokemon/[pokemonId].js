import Image from "next/image"
import style from "../../styles/Pokemon.module.css"

import {useRouter} from "next/router"

export const getStaticPaths = async () => {
    const maxPokemons = 120
    const api = 'https://pokeapi.co/api/v2/pokemon/'

    const res = await fetch(`${api}/?limit=${maxPokemons}`)
    const data = await res.json()

    const paths = data.results.map((pokemon, index) => {
        return {
            params: { pokemonId: (index + 1).toString() }
        }
    })

    return {
        paths, fallback: true
    }
}

export const getStaticProps = async (context) => {

    const id = context.params.pokemonId

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

    const data = await res.json()

    return {
        props: { pokemon: data },
    }

}

export default function Pokemon({ pokemon }) {
    const router = useRouter()

    if(router.isFallback){
        return <div>Carregando...</div>
    }


    return (<div className={style.pokemon_container}>
        <h1 className={style.title}>{pokemon.name}</h1>
        <Image
            src={`https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png`}
            width="200"
            height="200"
            alt={pokemon.name}
        />
        <div>
            <h3>Número:</h3>
            <p>#{pokemon.id}</p>
        </div>
        <div>
            <h3>Tipo:</h3>
            <div className={style.types_container}>
                {pokemon.types.map((item,index)=>(
                    <span key={index} className={`${style.type} ${style['type_'+ item.type.name]}`}>{item.type.name}</span>
                ))}
            </div>
        </div>
        <div className={style.data_container}>
            <div className={style.data_height}>
                <h4>Altura:</h4>
                <p>{pokemon.height * 10} cm</p>
            </div>
            <div className={style.data_weight}>
                <h4>Peso:</h4>
                <p>{pokemon.weight / 10} Kg</p>
            </div>
        </div>
    </div>)
}