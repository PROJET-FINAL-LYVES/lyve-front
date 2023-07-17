import React from 'react'
import SimpleButton from "../Buttons/SimpleButton";

const HeroBanner = () => {
    return (
        <div className="hero-banner h-{menu} w-100 p-12 pb-4 bg-[#191919] ro unded-lg flex ">
            <div className='hero-banner-left  w-1/2'>
                <img src="/assets/banner_photo.png" alt="logo" className='' />
            </div>
            <div className='hero-banner-right w-1/2 flex flex-col justify-center items-start text-left'>
                <h2 className='text-3xl font-bold text-gold mb-4'>LYVE</h2>
                <p className='text-6xl font-bold pr-20 mb-8'>La musique est meilleure quand on la partage</p>
                <SimpleButton
                    label="En savoir plus"
                    type="submit"
                    
                />
            </div>
        </div>
    )
}

export default HeroBanner;