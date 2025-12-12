import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { HiMiniMagnifyingGlass } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { getHomeBookAPI } from '../../services/allAPI'

function LandingPage() {

  const [homeBook , setHomeBook] = useState([])

  const getHomeBooks = async ()=>{
    const result = await getHomeBookAPI()
    console.log(result);
    setHomeBook(result.data)
    
  }

  useEffect(()=>{
    getHomeBooks()
  },[])
  return (
    <>
      <Header />
      {/* landing page */}

      <div style={{ height: "600px" }} className="flex flex-col  justify-center items-center bg-[url(https://img.freepik.com/free-photo/anime-style-cozy-home-interior-with-furnishings_23-2151176467.jpg?semt=ais_hybrid&w=740&q=80)] bg-no-repeat bg-cover text-white ">
        <div className=' w-full flex flex-col  justify-center items-center ' style={{ height: '600px', backgroundColor: 'rgba(0,0,0,0,5)' }}>
          <h1 className='text-5xl font-bold'>Wonderfull Gifts</h1>
          <p>Give your family and friends a book</p>
          <div className='mt-9 flex'>
            <input type="text" placeholder='Search Book' className='bg-white p-3 rounded-3xl placeholder-gray-500 w-100' />
            <HiMiniMagnifyingGlass className='text-gray-500 text-2xl mt-3' style={{ marginLeft: '-40px' }} />

          </div>
        </div>
      </div>
      {/* new arrivals */}
      <section className=' md:px-40 p-5 flex flex-col justify-center items-center'>
        <h1 className='text-gray-800 mb-2 text-sm'>NEW ARRIVALS</h1>
        <h1 className='font-medium text-xl'>Explore Our Latest Collection</h1>

       { homeBook?.length>0 ?
        <div className='md:grid grid-cols-4 w-full mt-5'>

          {  homeBook?.map((item)=>(<div className='p-3'>
            <div className='shadow p-3 rounded'>
              <img width={"100%"} height={"300px"} src={item.imageUrl}alt="" />
              <div className='text-center mt-3'>
                <p className='font-bold text-2xl'>{item.title}</p>
                <p className='font-bold text-xl'>{item.author}</p>
                <p className='font-bold '>{item.price}</p>

              </div>
            </div>

          </div>))
          }

        </div>
        :
        <p>Loading</p>
        
      }

        <div className='text-center my-5'>
          <Link to={"/all-book"}> <button className='px-3 py-2 bg-blue-900 text-white hover:border hover:border-blue-900 hover:text-blue-900 hover:bg-white'>Explore</button></Link>
        </div>

      </section>
      {/* authors */}
      <div className=' py-12 px-6 md:px-16'>

        <div className=' max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10'>
          <div className='flex flex-col justify-center items-center    '>
            <h4 className='text-gray-800 mb-4 text-sm'>FEATURED AUTHORS</h4>
            <p className='font-medium text-xl'>Captivates with every word</p>
            <p className='mb-2 text-justify sm:px-4'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur nemo aliquam minima magni suscipit. Dolorem natus quisquam nobis vero repellat libero adipisci corrupti culpa veritatis officia! Maxime eligendi eveniet vitae, cumque corporis facere cupiditate inventore iusto quos officiis dignissimos temporibus sed! Quae assumenda corrupti laborum reprehenderit odio atque sed ullam?aliquam minima magni suscipit. Dolorem natus quisquam nobis vero repellat libero adipisci corrupti culpa veritatis officia! Maxime eligendi eveniet vitae, cumque corporis facere cupiditate inventore iusto quos officiis dignissimos temporibus sed! Quae assumenda corrupti laborum reprehenderit odio atque sed ullam?</p>
            <p className=' text-justify sm:p-4'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur nemo aliquam minima magni suscipit. Dolorem natus quisquam nobis vero repellat libero adipisci corrupti culpa veritatis officia! Maxime eligendi eveniet vitae, cumque corporis facere cupiditate inventore iusto quos officiis dignissimos temporibus sed! Quae assumenda corrupti laborum reprehenderit odio atque sed ullam?Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>

          </div>
          <div className='flex justify-center md:justify-end'>
            <img src="https://wallpapers.com/images/hd/bts-v-black-tie-b3fvi5j1rkmq58fd.jpg" alt="author" className='rounded-lg shadow-lg' />
          </div>

        </div>
      </div>
      {/* testimonials */}
      <section className=' md:px-40 p-5 flex flex-col justify-center items-center'>
        <h4 className='text-gray-800 mb-2 text-sm'>TESTIMONIALS</h4>
        <p className='font-medium text-xl'> See What Others Are Saying</p>
        <div className='md:grid grid-cols-3 w-full mt-5'>

          <div className='p-3'>
            <div className='shadow p-3 rounded-lg shadow-lg'>
              <div className='flex justify-center'>
                <img className='rounded-full w-48 h-48' width={"100%"} height={"300px"} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxQqi20i38lCTQISSXITWqDlSOvn4CtiODFl5HKVbTzhzen6h4-Fcx6G8xACzDZd-nwl4&usqp=CAU" alt="" />

              </div>              <div className='text-center mt-3'>
                <p className='font-semibold text-xl'>Caroline Beckham </p>
                <p className='text-justify sm:px-4'>Victoria Caroline Beckham  is an English singer, songwriter, dancer, fashion designer, author, businesswoman</p>


              </div>
            </div>

          </div>

          <div className='p-3'>
            <div className='shadow p-3 rounded-lg shadow-lg'>
              <div className='flex justify-center'>
                <img className='rounded-full w-48 h-48 ' width={"100%"} height={"300px"} src="https://helios-i.mashable.com/imagery/articles/031LuSTDlhhhfSmqagysqTw/hero-image.fill.size_1200x1200.v1623385671.jpg" alt="" />

              </div>
              <div className='text-center mt-3'>
                <p className='font-semibold text-xl'>Neil Richard MacKinnon </p>
                <p className='text-justify sm:px-4'>Neil Richard MacKinnon Gaiman is an English author of short fiction, novels, comic books, audio theatre, and screenplays. His works include the comic series </p>


              </div>
            </div>

          </div>

          <div className='p-3'>
            <div className='shadow p-3 rounded-lg shadow-lg '>
              <div className=' flex justify-center'>
                <img className='rounded-full w-48 h-48  ' width={"100%"} height={"300px"} src="https://library.ltikorea.or.kr/rest/content/thumbnail/14715?target=default&width=300&height=300" alt="" />

              </div>
              <div className='text-center mt-3'>
                <p className='font-semibold text-xl'>Han Kang </p>
                <p className='text-justify sm:px-4'>Han Kang is a South Korean writer. From 2007 to 2018, she taught creative writing at the Seoul Institute of the Arts.</p>


              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />

    </>
  )
}

export default LandingPage