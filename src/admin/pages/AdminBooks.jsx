import React, { useEffect, useState } from 'react'
import AdminSidebar from '../components/AdminSidebar'
import { approveBookAPI, getAllBooksAdminAPI, getAllUsersAPI } from '../../services/allAPI'
import AdminHeaders from '../components/AdminHeaders'

function AdminBooks() {

  const [bookListStatus, setBookListStatus] = useState(true)
  const [userListStatus, setUserListStatus] = useState(false)
  const [allBooks, setAllBooks] = useState([])
  const [token, setToken] = useState("")
  const [allUsers, setAllUsers] = useState([])

  //get all books

  const getAllBooks = async () => {
    try {
      const result = await getAllBooksAdminAPI()
      console.log(result);

      if (result.status == 200) {
        setAllBooks(result.data)
      }

    } catch (error) {
      console.log(error);

    }
  }

  const approveBook = async (id) => {
    console.log(id);
    try {
      const result = await approveBookAPI(id)
      console.log(result);
      getAllBooks()

    } catch (error) {
      console.log(error);
    }


  }


  //get all users
  const getAllUsers = async () => {
    try {

      //reqHeader
      const reqHeader = {
        "Authorization":`Bearer ${token}`
      }

      const result = await getAllUsersAPI(reqHeader)
      console.log(result);
      if (result.status == 200) {
        setAllUsers(result.data)
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {

    getAllBooks()
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }

  }, [])

  useEffect(() => {
  if (token && userListStatus) {
    getAllUsers();
  }
}, [token, userListStatus]);

  return (
    <>
    <AdminHeaders/>
      <div className='md:grid grid-cols-5 gap-2'>
        <div className='col-span-1'>
          <AdminSidebar />


        </div>
        <div className='col-span-4 p-10'>
          <h1 className='text-center text-3xl font-bold'>All Books</h1>
          {/* tabs */}
          <div className='flex justify-center items-center font-medium'>
            {/* when we want the userlist the book list is not showing same for books */}
            <p onClick={() => { setUserListStatus(false), setBookListStatus(true) }} className={bookListStatus ? "text-blue-500 p-4 border-gray-200 border-t border-l border-r rounded cursor-pointer" : 'p-4 border-b border-gray-200 cursor-pointer'}>Book List</p>
            <p onClick={() => { setUserListStatus(true), setBookListStatus(false)}} className={userListStatus ? "text-blue-500 p-4 border-gray-200 border-t border-l border-r rounded cursor-pointer" : 'p-4 border-b border-gray-200 cursor-pointer'}>Users</p>
          </div>
          {/* we create 2 states for this operation only booklists status true it shows boklist userlist is false that time */}
          {bookListStatus &&

            (
              <>

                <div className='md:grid grid-cols-4 w-full my-5'>
                  {allBooks?.length > 0 ?

                    allBooks?.map((book, index) => (
                      <div className='shadow rounded p-3 m-4'>
                        <img width={"100%"} height={"300px"} src={book?.imageUrl} alt="" />
                        <div className='flex flex-col justify-center items-center mt-4'>
                          <p>{book?.title}</p>
                          <p>{book?.author}</p>
                          <p>₹{book?.dPrice}</p>
                          {book?.status == "pending" &&
                            <button onClick={() => approveBook(book?._id)} className=' w-full mt-3 p-3 rounded bg-green-700 text-white hover:border-green-600 hover:bg-white hover:text-green-700'>Approve</button>
                          }
                          {book?.status == "approved" &&
                            <div className='w-full flex justify-end'>
                              <img src="https://png.pngtree.com/png-clipart/20200225/original/pngtree-green-check-mark-icon-flat-style-png-image_5253210.jpg" style={{ width: "50px", borderRadius: "50%" }} alt="" />
                            </div>}



                        </div>
                      </div>
                    ))
                    :

                    <p className='text-red-700 text-center mt-10 text-xl'>No Books Available</p>}
                </div>
              </>)



          }

          {userListStatus &&
          
          ( <>
              <div className='md:grid grid-cols-3 w-full my-5'>
                
                { allUsers ?.length >0 ?
                allUsers?.map((user,index)=>(
                  <div className='shadow rounded p-2 m-2 bg-gray-200'>
                  <p className='text-red-700 font-bold '>ID :{user?._id}</p>
                  <div className='flex items-center mt-3'>
                    <img src={user?.profile} alt="" width={"80px"} height={"80px"} style={{ borderRadius: "50%" }} />
                    <div className='flex flex-col ml-3 w-full'>
                      <p className='text-blue-800 text-lg font-bold'>{user?.username}</p>
                      <p>{user?.email}</p>
  
                    </div>
  
                  </div>
  
                </div>
                ))
                
  :
                        <p className='text-red-700 text-center mt-10 text-xl'>No user Available</p>
  }
              </div>
           </>)

          }


        </div>

      </div>


    </>
  )
}

export default AdminBooks