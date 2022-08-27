import Link from "next/link"

export default function Button({ id, text, stilo='', type='' }) {

    function lin(link){
    if (link <= 1) {
        return link = 1
    } else if (link >= 905) {
        return link = 905
    } else {
        return link
    }
    }

    function verifica(type, valor){
        if(type=='som'){
            return lin(valor+1)
        }
        if(type=='sub'){
            return lin(valor-1)
        }
        if(type==''){
            return valor
        }
    }

    return (<>
        <Link href={`${verifica(type, id)}`}><a className={stilo}>{text}</a></Link>
    </>)
}