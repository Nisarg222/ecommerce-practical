import React from 'react'
const Hero = () => {
    return (
        <>
            <div>
                <div className='overlay'>
                    <div className='md:container md:mx-auto flex flex-col justify-between lg:flex-row'>
                        <div className='ml-5 my-20 flex flex-col lg:grid-cols-7 mx-auto md:mx-auto lg:my-32 lg:w-7/12 '>
                            <h4 className='text-xl lg:text-2xl font-semibold' style={{color: '#ffb524'}}>100% Cotton Material</h4>
                            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-10 lg:w-9/12 text-white'>T-shirts and Jeans</h1>
                            <div className='relative box-border w-full'>
                                <input className='border border-orange-400 relative w-8/12 rounded-full  pl-4 py-4 ' type="text" placeholder='Search'/>
                                <button className='text-white absolute py-4 right-1/3 top-0 px-6 border border-orange-400 rounded-full font-semibold text-md' style={{backgroundColor: '#2a334f'}} type="submit">Submit Now</button>
                            </div>
                        </div>
                        <div className='w-10/12 md:w-9/12 md:mx-auto m-auto lg:w-4/12 lg:h-4/12'>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero
