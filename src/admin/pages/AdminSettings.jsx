import React, { useContext, useEffect, useState } from 'react'
import Footer from '../../common/components/Footer'
import AdminSidebar from '../components/AdminSidebar'
import { toast } from 'react-toastify'
import { adminProfileUpdateContext } from '../../context/ContextShare'
import SERVERURL from '../../services/serverURL'
import { updateAdminProfileAPI } from '../../services/allAPI'
import AdminHeaders from '../components/AdminHeaders'


function AdminSettings() {
  const [token, setToken] = useState("")

  const [preview, setPreview] = useState("")

  // context

  const {setAdminProfileUpdateStatus} = useContext(adminProfileUpdateContext)


  const [adminDetails, setAdminDetails] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    profile: ""
  })

  const [existingProfile, setExistingProfile] = useState("")

  console.log(adminDetails);
  console.log(existingProfile);

  const handleReset = () => {
    let user = JSON.parse(sessionStorage.getItem("existingUser"))
    setAdminDetails({ ...adminDetails, username: user.username, password: user.password, confirmPassword: user.password })
    setExistingProfile(user.profile)
    setPreview("")
  }

  //  profile

  const handleFile = (e) => {
    setAdminDetails({ ...adminDetails, profile: e.target.files[0] })
    setPreview(URL.createObjectURL(e.target.files[0]))
  }

  const handleSubmit = async () => {
    const { username, password, confirmPassword } = adminDetails
    if (!username || !password || !confirmPassword) {
      toast.info(`Fill the details completely`)
    } else {
      if (password != confirmPassword) {
        toast.warning(`Password Must Match`)
      } else {
        // reqHeader

        const reqHeader = {
          "Authorization": `Bearer ${token}`
        }
        if (preview) {
          const reqBody = new FormData()
          for (let key in adminDetails) {
            reqBody.append(key, adminDetails[key])
          }
          const result = await updateAdminProfileAPI(reqBody, reqHeader)
          console.log(result);
          if (result.status == 200) {
            toast.success("Profile Updated Succesfully")
            sessionStorage.setItem("existingUser", JSON.stringify(result.data))
            setAdminProfileUpdateStatus(result)

          } else {
            toast.error(`Something Went Wrong`)
          }
        }
        else {
          const result = await updateAdminProfileAPI({ username, password, profile: existingProfile }, reqHeader)
          console.log(result);
          if (result.status == 200) {
            toast.success("Profile Updated Succesfully")
            sessionStorage.setItem("existingUser", JSON.stringify(result.data))
            setAdminProfileUpdateStatus(result)
          } else {
            toast.error(`Something Went Wrong`)
          }
        }
      }

    }

  }





  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
      let user = JSON.parse(sessionStorage.getItem("existingUser"))
      setAdminDetails({ ...adminDetails, username: user.username, password: user.password, confirmPassword: user.password })
      setExistingProfile(user.profile)
    }
  }, [])


  return (
    <>
      <AdminHeaders />
      <div className='md:grid grid-cols-[1fr_4fr]'>
        <div>
          <AdminSidebar />
        </div>
        <div className='p-4'>
          <h1 className='text-3xl text-center font-semibold my-10'>Settings</h1>
          <div className='md:grid grid-cols-2 mt-10'>
            <div className='md:px-10 px-5'>
              <p className='text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, deleniti, iusto rerum autem dolorem ipsum iste accusantium quo vel et deserunt suscipit consequatur, provident repellendus voluptatum reiciendis dignissimos beatae. Ipsum.Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, deleniti, iusto rerum autem dolorem ipsum iste accusantium quo vel et deserunt suscipit consequatur, provident repellendus voluptatum reiciendis dignissimos beatae. Ipsum</p>
              <p className='text-justify mt-10'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, earum, saepe similique sunt fuga esse adipisci ratione aut, sint ut quibusdam? Velit doloribus esse labore, libero quo ratione veritatis hicLorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, deleniti, iusto rerum autem dolorem ipsum iste accusantium quo vel et deserunt suscipit consequatur, provident repellendus voluptatum reiciendis dignissimos beatae. IpsumLorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, deleniti, iusto rerum autem dolorem ipsum iste accusantium quo vel et deserunt suscipit consequatur, provident repellendus voluptatum reiciendis dignissimos beatae. Ipsum.</p>
            </div>
            <div className='md:px-10 px-5'>
              <form className='bg-blue-200 md:p-10 p-5 rounded my-10 md:my-0'>
                <div className='flex justify-center items-center my-10'>
                  <label htmlFor="editUserProfile">
                    <input onChange={(e) => handleFile(e)} type="file" name="" id="editUserProfile" style={{ display: "none" }} />
                    {existingProfile == "" ?
                      <img src={preview ? preview : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2_5z67_9w_D7bU4LdQJy2ponyHEparph_07p0LK3j4askGjPAX-rG9DFwfqEK1IT3Q6o&usqp=CAU"} 
                    alt="" style={{ width: "170px", height: "170px", borderRadius: "50%" }} /> :

                      <img src={preview ? preview : `${SERVERURL}/imageuploads/${existingProfile}`} 
                    alt="" style={{ width: "170px", height: "170px", borderRadius: "50%" }} />

                    }                 
                     </label>
                </div>
                <div className='mb-3'>
                  <label htmlFor="">UserName</label>
                  <input value={adminDetails?.username} onChange={(e) => setAdminDetails({ ...adminDetails, username: e.target.value })} type="text" placeholder='Username' className='bg-white rounded w-full p-2' />
                </div>
                <div className='mb-3'>
                  <label htmlFor="">Password</label>
                  <input value={adminDetails?.password} onChange={(e) => setAdminDetails({ ...adminDetails, password: e.target.value })} type="text" placeholder='Password' className='bg-white rounded w-full p-2' />
                </div>
                <div className='mb-3'>
                  <label htmlFor="">Confirm Password</label>
                  <input value={adminDetails?.confirmPassword} onChange={(e) => setAdminDetails({ ...adminDetails, confirmPassword: e.target.value })} type="text" placeholder='Confirm Password' className='bg-white rounded w-full p-2' />
                </div>

                <div className='flex justify-between mt-10'>
                  <button type='button' onClick={handleReset} className='bg-amber-600 text-white rounded p-4 w-1/2 hover:border hover:border-amber-green-600 hover:text-amber-600 hover:bg-white'>Reset</button>
                  <button type='button' onClick={handleSubmit} className='bg-green-600 text-white rounded p-4 w-1/2 hover:border hover:border-green-600 hover:text-green-600 hover:bg-white ms-3'>Update</button>
                </div>
              </form>
            </div>

          </div>
        </div>

      </div>
      <Footer />


    </>
  )
}

export default AdminSettings