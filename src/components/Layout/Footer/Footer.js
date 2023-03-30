import React from 'react'


const Footer = () => {
    return (
        <footer className="bg-[#191919] bg-opacity-50  text-white w-200 flex p-12">
            <section className='w-1/2 flex'>
                <div className='column w-1/3 '>
                    <p className='text-gold text-xl mb-4'>
                        Contactez-nous
                    </p>
                    <p>
                        item 1
                    </p>
                    <p>
                        item 2
                    </p>
                    <p>
                        item 3
                    </p>
                </div>
                <div className='column w-1/3 '>
                    <p className='text-gold text-xl mb-4'>
                        Menu
                    </p>
                    <p>
                        item 1
                    </p>
                    <p>
                        item 2
                    </p>
                    <p>
                        item 3
                    </p>
                </div>
                <div className='column w-1/3 '>
                    <p className='text-gold text-xl mb-4'>
                        Liens utiles
                    </p>
                    <p>
                        item 1
                    </p>
                    <p>
                        item 2
                    </p>
                    <p>
                        item 3
                    </p>
                </div>
            </section>
        </footer>
    )
}

export default Footer