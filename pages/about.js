import Image from "next/dist/client/image"
import style from "../styles/About.module.css"

export default function About(){
    return (<div className={style.about}>
    <h1>Sobre o projeto</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, fuga! Doloremque, numquam velit sunt sit eaque qui, quaerat vitae corrupti magni, fugit nobis ut alias nesciunt odit dolorem natus voluptate.</p>
    <Image 
    src="/img/charizard.png"
    width="300"
    height="300"
    alt="Charlizard"
    />
    </div>)
}