import React from 'react'
import Hero from './home/Hero'
import Featured from './home/Featured'
import Products from './home/Products'
import Fact from './home/Fact'
import Testimonial from './testimonial/Testimonial'


const Home = () => {
    return (
        <>
            <Hero />
            <Products />
            <Featured />
            <Fact />
            <Testimonial />
        </>
    )
}

export default Home
