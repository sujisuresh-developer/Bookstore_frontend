import React, { useContext, useEffect, useState } from 'react'
import { FaRegEdit } from 'react-icons/fa'
import SERVERURL from '../../services/serverURL'
import { toast } from 'react-toastify'
import { updateProfileAPI } from '../../services/allAPI'
import { userProfileUpdateContext } from '../../context/ContextShare'

function EditProfile() {
    const [offCanvas, setOffCanvas] = useState(false)


    const [userdetails, setUserDetails] = useState({
        username: "",
        password: "",
        confirmpassword: "",
        bio: "",
        role: "",
        profile: ""
    })

    const [token, setToken] = useState("")
    const [exiistingProfile, setExistingProfile] = useState("")
    const [preview, setPreview] = useState("")

    const {serUserProfileUpdateStatus} = useContext(userProfileUpdateContext)

    console.log(userdetails);
    console.log(exiistingProfile);


    //for habdling image
    const handleImageUpload = (e) => {
        setUserDetails({ ...userdetails, profile: e.target.files[0] })
        const url = URL.createObjectURL(e.target.files[0])
        setPreview(url)
    }


    //     //update 
    //     const handleUpdate = async () => {
    //   const formData = new FormData();


    //   formData.append("username", userdetails.username);
    //   formData.append("password", userdetails.password);
    //   formData.append("confirmpassword", userdetails.confirmpassword);
    //   formData.append("bio", userdetails.bio);
    //   formData.append("role", userdetails.role);



    //   if (userdetails.profile && typeof userdetails.profile !== "string") {
    //     formData.append("profile", userdetails.profile);
    //   } 
    //   else {

    //     formData.append("profile", exiistingProfile);
    //   }

    //   const reqHeader = {
    //     "Authorization": `Bearer ${token}`
    //   };

    //   try {
    //     const result = await updateProfileAPI(formData, reqHeader);

    //     if (result.status === 200) {
    //       toast.success("Profile updated successfully!");

    //       sessionStorage.setItem("existingUser", JSON.stringify(result.data));


    //     }
    //      else{
    //               toast.error("Error in updating profile")

    //             }

    //   } catch (error) {
    //     console.log(error);
    //     toast.error("something went wrong!");
    //   }
    // };


    //updating user profile

    const handleUpdate = async () => {
        const { username, password, confirmpassword, bio, role, profile } = userdetails
        if (!username || !password || !confirmpassword || !bio) {
            toast.info(`fill the form completely`)
        } else {
            if (password != confirmpassword) {
                toast.warning(`invalid credentials`)
            } else {
                //reqHeader
                const reqHeader = {
                    "Authorization": `Bearer ${token}`
                }
                const reqBody = new FormData()
                if (preview) {
                    for (let key in userdetails) {
                        reqBody.append(key, userdetails[key])
                    }
                    console.log(`inside preview`);

                    const result = await updateProfileAPI(reqBody, reqHeader)
                    console.log(result);
                    if(result .status == 200){
                      toast.success(`profile updated successfully`)
                      sessionStorage.setItem("existingUser",JSON.stringify(result.data))
                      serUserProfileUpdateStatus(result)
                      setOffCanvas(false)
                    }else{
                        toast.error(`something went wrong`)
                    }


                }else{
                    console.log(`not inside preview`);
                    const result = await updateProfileAPI({username,password,bio,role,profile:exiistingProfile},reqHeader)
                    console.log(result);
                    
                    if(result .status == 200){
                      toast.success(`profile updated successfully`)
                      sessionStorage.setItem("existingUser",JSON.stringify(result.data))
                      serUserProfileUpdateStatus(result)
                      setOffCanvas(false)
                    }else{
                        toast.error(`something went wrong`)
                    }

                }
            }
        }

    }

    const handleReset = () => {
        const user = JSON.parse(sessionStorage.getItem("existingUser"));

        // Reset the text fields
        setUserDetails({
            username: user.username,
            password: user.password,
            confirmpassword: user.password,
            bio: user.bio,
            role: user.role,
            profile: ""
        });

        // Reset existing profile image
        setExistingProfile(user.profile);


        setPreview("");



    };



    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
            const user = JSON.parse(sessionStorage.getItem("existingUser"))
            setUserDetails({ username: user.username, password: user.password, confirmpassword: user.password, bio: user.bio, role: user.role })
            setExistingProfile(user.profile)
        }
    }, [])






    return (
        <>
            <button onClick={() => setOffCanvas(true)} className='flex px-4 py-3 font-bold border border-blue-200 text-blue-600 '> <FaRegEdit className='mt-1 me-2' /> Edit</button>

            {offCanvas && <div>
                <div className=' fixed inset-0 bg-gray-500/75 w-full h-full '></div>
                <div className='bg-white h-full w-90 z-50 fixed top-0 left-0'>
                    <div className='bg-gray-900 px-3 py-4 flex justify-between text-white text-2xl'>
                        <h1>Edit User Profile</h1>
                        <button onClick={() => setOffCanvas(false)}>X</button>
                    </div>
                    <div className='flex justify-center items-center flex-col my-5'>
                        <label htmlFor="profilepic">
                            <input onChange={(e) => handleImageUpload(e)} type="file" style={{ display: "none" }} id='profilepic' />
                            {exiistingProfile == "" ?
                                <img src={preview ? preview : "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"} style={{ height: "150px", width: "150px", borderRadius: "50%" }} alt="" />
                                :
                                <img src={preview ? preview : `${SERVERURL}/imageuploads/${exiistingProfile}`} style={{ height: "150px", width: "150px", borderRadius: "50%" }} alt="" />
                            }
                        </label>
                    </div>
                    <div className='mt-10 mb-3 w-full px-5'>
                        <input value={userdetails.username} onChange={(e) => setUserDetails({ ...userdetails, username: e.target.value })} type="text" placeholder='Username' className='w-full border border-gray-300 placeholder-gray-500 p-2 rounded' />
                    </div>
                    <div className='mt-5 mb-3 w-full px-5'>
                        <input value={userdetails.password} onChange={(e) => setUserDetails({ ...userdetails, password: e.target.value })} type="text" placeholder='Password' className='w-full border border-gray-300 placeholder-gray-500 p-2 rounded' />
                    </div>
                    <div className='mt-5 mb-3 w-full px-5'>
                        <input value={userdetails.confirmpassword} onChange={(e) => setUserDetails({ ...userdetails, confirmpassword: e.target.value })} type="text" placeholder='Confirm Password' className='w-full border border-gray-300 placeholder-gray-500 p-2 rounded' />
                    </div>
                    <div className='mt-5 mb-3 w-full px-5'>
                        <textarea value={userdetails.bio} onChange={(e) => setUserDetails({ ...userdetails, bio: e.target.value })} type="text" placeholder='Bio' className='w-full border border-gray-300 placeholder-gray-500 p-2 rounded' />
                    </div>
                    <div className='flex justify-end w-full px-5'>
                        <button onClick={handleReset} className='bg-amber-600 text-white rounded border py-3 px-4 hover:text-amber-600 hover:border:amber-600 hover:bg-white '>Reset</button>
                        <button type='button' onClick={handleUpdate} className='bg-green-600 text-white rounded border py-3 px-4 hover:text-green-600 hover:border:green-600 hover:bg-white ms-3 '>Update</button>

                    </div>

                </div>
            </div>}
        </>
    )
}

export default EditProfile