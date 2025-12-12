import React, { useState } from 'react'
import Header from '../../common/components/Header'
import Footer from '../../common/components/Footer'
import { FaArrowUpRightFromSquare, FaLocationDot } from 'react-icons/fa6'
import { IoCloseCircle } from 'react-icons/io5'

function Careers() {

  //modal inside of apply
  const [applyModal, setApplyModal] = useState(false)
  return (
    <>
      <Header />
      <div className='md:px-40 p-5'>
        <div className='text-center my-5'>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus sequi quaerat perferendis suscipit corporis id reiciendis, perspiciatis unde rerum aperiam soluta impedit et velit dolore voluptatibus facilis praesentium, atque autem?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus sequi quaerat perferendis suscipit corporis id reiciendis, perspiciatis unde rerum aperiam soluta impedit et velit dolore voluptatibus facilis praesentium, atque autem?</p>
        </div>
        <div className='my-10'>
          <h1 className='text-2xl font-bold'>Current Opening</h1>
          <div className='flex my-10 justify-center items-center'>
            <input type="text" className='p-2 border-gray-200 text-black w-100 placeholder-gray-500' placeholder='search by title' />
            <button className='bg-blue-900 text-white p-2 hover:bg-white hover:text-blue-900 hover:border hover:border-blue-800'>Search</button>
          </div>

        </div>

        {/* job list */}
        <div className='border border-gray-200 p-5 shadow my-5'>
          <div className='flex mb-5'>
            <div className='w-full'>
              <h1>Frontend Developer</h1>
              <hr />
            </div>
            <button className='bg-blue-900 text-white p-3 ms-5 flex items-center'>Apply<FaArrowUpRightFromSquare className='ms-2 cursor-pointer' onClick={() => setApplyModal(true)} /></button>
          </div>
          <p className='flex'><FaLocationDot className='me-2 mt-1' />Kochi</p>
          <p className='text-lg my-2'>Job Type : FULL TIME</p>
          <p className='text-lg my-2'>Salary : 20000-30000/Month</p>
          <p className='text-lg my-2'>Qualification : BSC.CS</p>
          <p className='text-lg my-2'>Experience : 1-2yr</p>
          <p className='text-lg my-2 text-justify' >Description : Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, asperiores commodi. Deserunt recusandae ad temporibus! Fugiat beatae maxime voluptates laborum, animi, repellendus ullam, necessitatibus esse reiciendis officiis vero pariatur numquam?</p>

        </div>

      </div>

      {/* modal apply */}
      {applyModal &&
        <div className='relative z-10 overflow-y-hidden'>
          <div className='bg-gray-500/75 fixed inset-0'>
            <div className='flex justify-center items-center min-h-screen scroll-auto'>
              <div className='bg-white rounded-2xl md:w-250 w-100'>
                <div className='bg-black text-white flex justify-between items-center  p-3'>
                  <h3>Application Form</h3>
                  <button onClick={() => setApplyModal(false)} className=''><IoCloseCircle /></button>

                </div>

                <div className='relative p-5'>
                  <div className='md:grid grid-cols-2 gap-5'>
                    <div className=''>
                      <input type="text" placeholder="Full Name" className="border p-2 rounded w-full" />
                      <input type="text" placeholder="Email Id" className="border p-2 rounded mt-4 w-full" />
                    </div>
                    <div className='gap-3'>
                      <input type="text" placeholder="Qualification" className="border p-2 rounded w-full" />
                      <input type="number" placeholder="Phone" className="border p-2 rounded mt-4 w-full" />
                    </div>


                  </div>
                  <div>
                    <textarea name="" id="" placeholder='Cover Letter' rows={'4'} className='bg-white rounded border  w-full  p-2 mt-3'></textarea>
                  </div>
                  <div>
                    <label htmlFor="" className='font-bold'>Upload Resume:</label>
                    <input type="file" className="w-full border cursor-pointer   rounded file:bg-gray-300 file:p-2" />
                  </div>
                  <div className=' flex justify-end gap-3 bg-gray-400 mt-5 p-2 rounded'>
                    <button className='bg-amber-700 text-white px-5 py-2 rounded font-bold hover:border hover:border-amber-600 hover:text-amber-600 hover:bg-white'>Reset</button>
                    <button className='bg-green-700 text-white px-5 py-2 rounded font-bold hover:border hover:border-green-600 hover:text-green-600 hover:bg-white'>Submit</button>

                  </div>







                </div>

              </div>

            </div>

          </div>

        </div>}
      <Footer />

    </>
  )
}

export default Careers