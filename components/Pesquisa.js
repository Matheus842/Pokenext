import Link from "next/link";
import { useState } from "react";

export default function Pesquisa(props) {

    const [pesquisar, setPesquisar] = useState(1)


    return (
        <div className={props.className}>
            <input type="text" id="txt" placeholder="Procurar pokemon" onChange={(e)=>setPesquisar(e.target.value)}/>
            <Link href={`/pokemon/${pesquisar}`}><a>Procurar</a></Link>
        </div>)

}