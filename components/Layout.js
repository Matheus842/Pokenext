import Footer from "./Footer"
import Navbar from "./Navbar"

import Head from "next/head"

export default function Layout({children}){
    return(
        <>
        <Head>
            <link rel="shortcut icon" href="/img/favicon.ico" />
            <title>PokeNext</title>
        </Head>
        <script src="/js/jquery-3.6.0.js"></script>
        <Navbar />
        <main className="main-container">{children}</main>
        <Footer />
        </>
    )
}