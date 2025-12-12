
import React from 'react'
import { FaArrowRight, FaFacebookSquare, FaInstagramSquare, FaLinkedin } from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6'

function Footer() {
    return (
        <>
            <div className='md:grid  grid-cols-3 md:gap-9 bg-gray-900 text-white p-10'>
                <div>
                    <h3 className='text-bold'>About Us</h3>
                    <p className='text-justify mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex soluta placeat consequuntur consequatur earum neque eius quidem maiores dolor rem aspernatur quis molestias, necessitatibus nihil laudantium nulla. Voluptate, laborum necessitatibus!</p>
                </div>
                <div>
                    <h3 className='font-bold'>NEWS LETTER</h3>
                    <p className='my-5'>Stay Updated Without Latest Trends</p>
                    <div className='flex'>
                        <input type="text"  placeholder='Email Id' className='p-2 bg-white  placeholder-gray-500'/>
                        <button className='bg-yellow-400 p-3'><FaArrowRight/></button>
                    </div>
                </div>
                <div>
                    <h3 className='font-bold'>Follow Us</h3>
                    <p className='my-3'>Let Us Be Social</p>
                    <div className='flex mt-4'>
                        <FaInstagramSquare className='me-3 text-2xl'/>
                        <FaSquareXTwitter className='me-3 text-2xl' />
                        <FaFacebookSquare className='me-3 text-2xl' />
                        <FaLinkedin className=' text-2xl' />

                    </div>
                </div>
            </div>

            <div className='bg-black p-3 text-center text-white'>
                <p>Copyright © 2023 All rights reserved | This website is made with &#10084; by Ranjima R | LUMINAR TECHNOLAB</p>
            </div>
        </>
    )
}

export default Footer