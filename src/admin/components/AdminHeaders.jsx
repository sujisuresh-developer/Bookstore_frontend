import React, { useContext } from 'react'
import { FaPowerOff } from 'react-icons/fa'
import { userAuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function AdminHeaders() {
   const {setAuthorisedUser}=useContext(userAuthContext )  
     const navigate=useNavigate()
     const logout=()=>{
       sessionStorage.clear()
       toast.success("Logout successfull!!!")
       setAuthorisedUser(false)
       navigate("/")
     }
    return (
        <>
            <nav className="px-5 py-3 flex items-center">
                {/* logo */}
                <div className='flex items-center'>
                    <img width={"70px"} height={"70px"} src="https://i.pinimg.com/736x/af/d1/e6/afd1e65cacca8822d1f857d5182b3aed.jpg" alt="" />
                    <h1 className='font-bold flex text-2xl ms-4'>BOOKSTORE</h1>
                </div>
                {/* login */}
                <div className='ms-auto'>

                    <button className='flex justify-between items-center border border-black rounded px-3 py-2 ms-3 hover:bg-black hover:text-white'><FaPowerOff className='me-3' />Logout</button>
                </div>
            </nav>



        </>
    )
}

export default AdminHeaders