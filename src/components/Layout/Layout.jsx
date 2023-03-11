import React from 'react';

const Layout = ({ children }) => {
    return (
        <>

            {/* <Navbar/> */}

            <main className='min-h-screen py-32 flex text-center align-center justify-center flex-col bg-darkgray text-white font-primary'>
                {children}
            </main>

            {/* <Footer /> */}
        </>
    );
}

export default Layout;