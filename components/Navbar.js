import Link from 'next/link'
import Image from 'next/image'
import style from '../styles/Navbar.module.scss'
import Pesquisa from './Pesquisa'

export default function Navbar() {
    return (
        <nav className={style.navbar}>

            <div className={style.inicio}>
                <div className={style.logo}>
                    <Image
                        src='/img/pokeball.png'
                        width="30"
                        height="30"
                        alt="PokeNext"
                    />
                    <h1>PokeNext</h1>
                    <ul className={style.link}>
                        <li>
                            <Link href="/">
                                <a>Home</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/about">
                                <a>Sobre</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <Pesquisa className={style.pesquisa} />
        </nav>
    )
}