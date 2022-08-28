import Image from "next/image"
import style from "../../styles/Pokemon.module.scss"
import Button from "../../components/Button"

import { useRouter } from "next/router"

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

    'https://pokeapi.co/api/v2/evolution-chain/{id}/'

    const id = context.params.pokemonId

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

    const especie = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)

    const specie = await especie.json()

    const data = await res.json()

    return {
        props: { pokemon: data, especie: specie },
    }

}

export default function Pokemon({ pokemon, especie }) {
    const router = useRouter()
    const res = []
    var res1 = style.hidden, imgType

    function stats(id, name, stats) {

        let total = 0

        for (let x of stats){
            total = total + x.base_stat
        }

        switch (name) {
            case 'hp': return id/total*100
                break;

            case 'attack': return id/total*100
                break;

            case 'defense': return id/total*100
                break;

            case 'special-attack': return id/total*100
                break;

            case 'special-defense': return id/total*100
                break;

            case 'speed': return id/total*100
                break;
        
            default:
                return 100
                break;
        }
        
    }

    function color(id){
        switch (id) {
        case 'hp': return '#008000'
            break;

        case 'attack': return '#f42'
            break;

        case 'defense': return '#6cf'
            break;

        case 'special-attack': return '#a59'
            break;

        case 'special-defense': return '#39f'
            break;

        case 'speed': return '#fc3'
            break;
    
        default:
            return '#000'
            break;

    }}

    function Gen(gen) {
        gen = gen.replace('generation-', '')
        return gen.toUpperCase()
    }

    if (router.isFallback) {
        return <div>Carregando...</div>
    }

    if (especie.is_mythical) {
        res.push('Pokemon mítico')
        imgType = style.mitico
        res1 = style.specials
    } else if (especie.is_legendary) {
        res.push('Pokemon lendário')
        imgType = style.lendario
        res1 = style.specials
    }

    if (pokemon.height * 10 >= 100) {
        var temp = pokemon.height
        var altura = `${Math.round(temp) / 10} m`
    } else {
        var altura = pokemon.height * 10
        altura = `${altura} cm`
    }


    return (<div className={style.pokemon_container}>

        <div className={style.bnts}>
            <Button id={pokemon.id} text={"Anterior"} type={'sub'} stilo={style.bnt}></Button>
            <Button id={pokemon.id} text={"Proximo"} type={'som'} stilo={style.bnt}></Button>
        </div>

        <h1 className={style.title}>{pokemon.name}</h1>

        <div className={imgType}>
            <Image
                src={`https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png`}
                width="200"
                height="200"
                alt={pokemon.name}
            />
        </div>

        <div>
            <h3>Número:</h3>
            <p>#{pokemon.id}</p>

            <h3>Tipo:</h3>
            <div className={style.types_container}>
                {pokemon.types.map((item, index) => (
                    <span key={index} className={`${style.type} ${style['type_' + item.type.name]}`}>{item.type.name}</span>
                ))}
            </div>

            <div>
                <h3>{Gen(especie.generation.name)} geração.</h3>
            </div>
        </div>

        <div className={style.data_container}>
            <div className={style.data_height}>
                <h4>Altura:</h4>
                <p>{altura}</p>
            </div>
            <div className={style.data_weight}>
                <h4>Peso:</h4>
                <p>{pokemon.weight / 10} Kg</p>
            </div>
        </div>

        <div className={style.info}>
            <details>
                <summary>
                    <h1>Detalhes</h1>
                </summary>
                <hr />
                <ul className={style.listaPokemon}>
                    <li className={res1}>{res}</li>
                    {console.log(pokemon)}
                    {pokemon.stats.map((index, valor)=>(<>
                        <li key={index} className={style.grid}>{pokemon.stats[valor].stat.name}:{pokemon.stats[valor].base_stat}</li>
                        <span className={style.Bar}>
                            <p style={{"width": stats(pokemon.stats[valor].base_stat, pokemon.stats[valor].stat.name, pokemon.stats)+'%',"background-color": color(pokemon.stats[valor].stat.name)}}></p>
                        </span>
                        </>))}
                </ul>
            </details>
        </div>
    </div>)
}