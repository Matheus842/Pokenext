import style from '../styles/Home.module.css'
import Image from 'next/image'

import Card from '../components/Card'

export async function getStaticProps(){

  const maxPokemons = 251
  const api = 'https://pokeapi.co/api/v2/pokemon/'

  const res = await fetch(`${api}/?limit=${maxPokemons}`)
  const data = await res.json()
  
  data.results.forEach((item, index) => {
    item.id = index+1
  });

  return {
    props:{
      pokemons: data.results,
    }
  }

}

export default function Home({pokemons}) {
  return (<>
  <div className={style.title}>
    <h1>Poke<span>Next</span></h1>
    <Image
    src="/img/pokeball.png"
    width="50"
    height="50"
    alt='PokeNext'
    />
  </div>
  <div className={style.pokemon_container}>
    {pokemons.map((pokemon)=>(
      <Card key={pokemon.id} pokemon={pokemon}/>
    ))}
  </div>
  </>)
}
