import React, { useState, useEffect } from 'react'
import AdminHeaders from '../components/AdminHeaders'
import AdminSidebar from '../components/AdminSidebar'
import { FaBook, FaUser, FaUserGraduate } from 'react-icons/fa'
import { getAllBooksAdminAPI, getAllUsersAPI } from '../../services/allAPI'

function AdminHome() {

  const [allBooks, setAllBooks] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [token, setToken] = useState("")

  // Fetch all books
  const getAllBooks = async () => {
    try {
      const result = await getAllBooksAdminAPI()

      if (result.status === 200) {
        setAllBooks(result.data)
      }

    } catch (error) {
      console.log(error)
    }
  }

  // Fetch all users
  const getAllUsers = async () => {
    try {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }

      const result = await getAllUsersAPI(reqHeader)

      if (result.status === 200) {
        setAllUsers(result.data)
      }

    } catch (error) {
      console.log(error)
    }
  }

  // Load books and token
  useEffect(() => {
   if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
   }
  },[])
  // Load users after token is set
  useEffect(() => {
    if (token) {
      getAllUsers()
      getAllBooks()
    }
  }, [token])

  return (
    <>
      <AdminHeaders />
      <div className='md:grid grid-cols-[1fr_4fr]'>
        <div>
          <AdminSidebar />
        </div>

        <div className='p-4'>
          <div className='md:grid grid-cols-3 text-white'>

            {/* Total Books */}
            <div className='px-5'>
              <div className='grid grid-cols-[1fr_3fr] bg-blue-700 rounded p-4'>
                <div className='flex justify-center items-center'>
                  <FaBook className='text-3xl' />
                </div>
                <div>
                  <h1>Total No: of Books <span className='text-xl'>{allBooks?.length}</span></h1>
                </div>
              </div>
            </div>

            {/* Total Users */}
            <div className='px-5'>
              <div className='grid grid-cols-[1fr_3fr] bg-green-700 rounded p-4'>
                <div className='flex justify-center items-center'>
                  <FaUser className='text-3xl' />
                </div>
                <div>
                  <h1>Total No: of Users <span className='text-xl'>{allUsers?.length}</span></h1>
                </div>
              </div>
            </div>

            {/* Applications (optional, static for now) */}
            <div className='px-5'>
              <div className='grid grid-cols-[1fr_3fr] bg-yellow-700 rounded p-4'>
                <div className='flex justify-center items-center'>
                  <FaUserGraduate className='text-3xl' />
                </div>
                <div>
                  <h1>Total No: of Applications <span className='text-xl'>85</span></h1>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </>
  )
}

export default AdminHome
