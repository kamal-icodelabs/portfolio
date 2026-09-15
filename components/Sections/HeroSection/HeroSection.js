import Image from "next/image";
import heroImg from '../../../public/img/image.png'
import css from  './HeroSection.module.css'

export default function HeroSection() {
    return (
        <>

            <Image fill alt="hero image" src={heroImg} />

        </>
    )
}