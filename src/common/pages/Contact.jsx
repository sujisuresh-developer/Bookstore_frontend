import React from 'react'
import Header from '../components/Header'
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { IoIosSend } from 'react-icons/io'
import Footer from '../components/Footer'

function Contact() {
  return (
    <>
      <Header />
      <div className=' md:px-40 p-5 flex flex-col justify-center items-center'>
        <div className='mb-10 text-center'>
          <h1 className=' mt-15 text-gray-900 font-bold text-3xl'>Contacts</h1>
          <p className='text-lg mt-3 '>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem mollitia quo natus consequatur temporibus reiciendis adipisci iusto hic nobis, quisquam excepturi quod delectus velit sequi sint deleniti illum voluptatum nam.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem mollitia quo natus consequatur temporibus reiciendis adipisci iusto hic nobis, quisquam excepturi quod delectus velit sequi sint deleniti illum voluptatum nam.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem mollitia quo natus consequatur temporibus reiciendis adipisci iusto hic nobis, quisquam excepturi</p>
        </div>


      </div>
      {/* contact info location number email */}
      <div className='mt-5 flex flex-col md:flex-row justify-around text-center items-center gap-6 md:gap-10'>
        <div className='flex items-center gap-4'>
          <div className='w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center'>
            <FaLocationDot />
          </div>
          <p>123 Main Street,Apt 4B, <br />Anytown,CA 91234</p>
        </div>

        <div className='flex items-center gap-4'>
          <div className='w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center'>
            <FaPhoneAlt />
          </div>
          <p>+91 8590037602</p>
        </div>

        <div className='flex items-center gap-4'>
          <div className='w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center'>
            <FaEnvelope />
          </div>
          <p>Bookstore@gmail.co3</p>
        </div>

      </div>

      {/* form */}

      <div className='md:grid grid-cols-2 gap-8 pt-10 md:px-20 mb-10'>
        <div>
          {/* from */}
          <form className='bg-gray-100 p-5 rounded-medium'>
            <h3 className='text-center text-lg font-semibold pb-5 '>Send me a Message</h3>
            <input className=' mb-6 w-full  border border-gray-700 rounded p-3' type="text" name="" id="" placeholder='Name' />
            <input className=' mb-6 w-full border border-gray-700 rounded p-3' type="text" name="" id="" placeholder='Email Id' />
            <textarea name="" id="" placeholder='Message' className='w-full h-35 border border-gray-700 p-2 rounded '></textarea>

            <button className='w-full mb-6 bg-gray-900 text-white p-2 flex justify-center text-xl mt-6 '>Send<span className=''> <IoIosSend className='text-2xl ms-2' /></span> </button>
          </form>

        </div>

        <div className='mt-5 md:mt-0 flex justify-center items-center'>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d91034.70690491074!2d76.30829335!3d9.970874599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d08f976f3a9%3A0xe9cdb444f06ed454!2sErnakulam%2C%20Kerala!5e1!3m2!1sen!2sin!4v1761585491519!5m2!1sen!2sin" className='sm:w-140 sm:h-120 w-80 h-80 ' allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>

      </div>

    <Footer/>
    </>
  )
}

export default Contact