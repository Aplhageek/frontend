import React, { useEffect } from 'react'
import Header from '../Header/Header';
import Hero from '../Hero/Hero';
import Listing from '../Listing/Listing';
import Footer from '../Footer/Footer';

const LandingPage = () => {
    useEffect(() => {
        document.title = "Q-estate";
    }, []);

    return (
        <div className='landing_page_container' >

            <Header onPage='home' />

            {/* Hero Section */}
            <Hero />

            {/* Featured Listing */}
            <Listing /> 

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default LandingPage;