import React, { useContext, useEffect, useState } from 'react'
import Header from '../../common/components/Header'
import Footer from '../../common/components/Footer'
import { MdVerified } from 'react-icons/md'
import { FaRegEdit } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { addBookAPI, deleteAUserAddedBookAPI, getPurchasedBooksAPI, getUserBooksAPI } from '../../services/allAPI'
import EditProfile from '../components/EditProfile'
import { userProfileUpdateContext } from '../../context/ContextShare'
import SERVERURL from '../../services/serverURL'


function Profile() {

  const [sellBooks, setSellbooks] = useState(true)
  const [bookstatus, setBookStatus] = useState(false)
  const [purchaseHistory, setPurchaseHistory] = useState(false)
  const [preview, setPreview] = useState("")
  const [allUploadImages, setallUploadImages] = useState([])
  const [token, setToken] = useState("")
  const [username, setUsername] = useState("")
  const [userAddedBooks, setUserAddedBooks] = useState([])
  const [deleteBookStatus, setDeleteBookStatus] = useState(false)
  const [purchasedBooks, setPurchasedBooks] = useState([])
   const[userprofile,setUserProfile]=useState("")


  const { userProfileUpdateStatus } = useContext(userProfileUpdateContext)



  const [bookDetails, setBookDetails] = useState({
    title: "", author: "", noOfPages: "", imageUrl: "", price: "", dPrice: "", abstract: "", publisher: "", language: "", isbn: "", category: "",
    uploadImages: []
  })

  console.log(bookDetails);
  //add-book submit button
  const handleAddBook = async () => {
    const { title, author, noOfPages, imageUrl, price, dPrice, abstract, publisher, language, isbn, category, uploadImages } = bookDetails
    console.log(title, author, noOfPages, imageUrl, price, dPrice, abstract, publisher, language, isbn, category, uploadImages);


    if (!title || !author || !noOfPages || !imageUrl || !price || !dPrice || !abstract || !publisher || !language || !isbn || !category || uploadImages.length == 0) {
      toast.info("Fill the form completely");
    } else {
      //reqHeader
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      //reqbody - formData() // append-reqbody.append(key,value)
      //reqBody.append("title",title)
      const reqBody = new FormData()
      for (let key in bookDetails) {
        if (key != "uploadImages") {
          reqBody.append(key, bookDetails[key])
        } else {
          bookDetails.uploadImages.forEach(img => {
            reqBody.append("uploadImages", img)
          })
        }
      }
      try {
        const result = await addBookAPI(reqBody, reqHeader)
        console.log(result);
        if (result.status == 200) {
          toast.success("Book Added Succesfully")
          // reset()

        } else if (result.status == 401) {
          toast.warning(result.response.data)
        } else {
          toast.error("Error in adding Book")
          // reset()

        }
      } catch (error) {
        toast.error("Something went wrong")
        console.log(error);

      }
    }
  }

  // inserting image file

  const handleFile = (e) => {
    console.log(e.target.files[0]);
    const fileArray = bookDetails.uploadImages
    fileArray.push(e.target.files[0])
    setBookDetails({ ...bookDetails, uploadImages: fileArray })

    //converting files into url
    const url = URL.createObjectURL(e.target.files[0])
    setPreview(url)

    let images = allUploadImages
    images.push(url)
    setallUploadImages(images)
  }
  console.log(allUploadImages);

  // console.log(preview);

  //reset button

  const reset = () => {
    setBookDetails({
      title: "", author: "", noOfPages: "", imageUrl: "", price: "", dPrice: "", abstract: "", publisher: "", language: "", isbn: "", category: "",
      uploadImages: []


    })

    setPreview("")
    setallUploadImages([])
  }



  //get user added books
  const getUserAddedBooks = async () => {
    try {
      //reqHeader
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }

      const result = await getUserBooksAPI(reqHeader)
      console.log(result);
      setUserAddedBooks(result.data)

    } catch (error) {
      console.log(error);

    }
  }
  console.log(userAddedBooks);







  useEffect(() => {
    if (bookstatus == true) {
      getUserAddedBooks()
    }
  }, [bookstatus, deleteBookStatus])



  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }
    if (sessionStorage.getItem("existingUser")) {
      const name = JSON.parse(sessionStorage.getItem("existingUser"))
      setUsername(name.username)
      const existingProfile=JSON.parse(sessionStorage.getItem("existingUser"))
      setUserProfile(existingProfile.profile)


    }
  }, [userProfileUpdateStatus])


  //delete user book

  const handleDeleteBook = async (id) => {
    try {
      const result = await deleteAUserAddedBookAPI(id)
      console.log(result);
      if (result.status == 200) {
        setDeleteBookStatus(true)
        toast.success(`Book Deleted Successfully`)
      } else {
        toast.error("Something Went Wrong")
      }

    } catch (error) {
      console.log(error);


    }

  }


  //get user purchased books

  const userPurchasedBooks = async () => {
    //reqHeader
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    try {
      const result = await getPurchasedBooksAPI(reqHeader)
      if (result.status == 200) {
        setPurchasedBooks(result.data)
      }
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    if (purchaseHistory) {
      userPurchasedBooks()

    }
  }, [purchaseHistory])

  return (
    <>
      <Header />
      <div style={{ height: "200px" }} className='bg-black'></div>
      <div className='bg-white p-3' style={{ width: "230px", height: "230px", borderRadius: "50%", marginLeft: "70px", marginTop: "-130px" }}>
         <img
                  src={userprofile =="" ? "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png":userprofile.startsWith("https")?userprofile:`${SERVERURL}/imageuploads/${userprofile}`} alt="" style={{ width: "200px", height: "200px", borderRadius: "50%" }} />
      </div>
      <div className='md:flex justify-between px-20 mt-5'>
        <div className='flex items-center'>
          <h1 className='font-bold md:text-3xl text-2xl'>{username}</h1>
          <MdVerified className='text-blue-500 ms-3 text-xl ' />
        </div>
        <div>
          <EditProfile />
        </div>
      </div>

      <p className='md:px-20 px-5 my-5 text-xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis sunt amet dolorum rerum corporis? Natus, beatae, earum cum inventore sapiente reprehenderit dolore dolorem esse impedit quam libero non asperiores fugiat?</p>



      <div className='flex justify-center items-center my-8 font-medium text-lg'>

        <p onClick={() => { setSellbooks(true), setBookStatus(false), setPurchaseHistory(false) }} className={sellBooks ? 'text-blue-500 p-4 border-gray-200 border-t border-l border-r rounded cursor-pointer' : 'p-4 border-b border-gray-200 cursor-pointer'}>Sell Books</p>
        <p onClick={() => { setSellbooks(false), setBookStatus(true), setPurchaseHistory(false) }} className={bookstatus ? 'text-blue-500 p-4 border-gray-200 border-t border-l border-r rounded cursor-pointer' : 'p-4 border-b border-gray-200 cursor-pointer'}>Book Status</p>
        <p onClick={() => { setSellbooks(false), setBookStatus(false), setPurchaseHistory(true), userPurchasedBooks() }} className={purchaseHistory ? 'text-blue-500 p-4 border-gray-200 border-t border-l border-r rounded cursor-pointer' : 'p-4 border-b border-gray-200 cursor-pointer'}>Purchase History</p>
      </div>

      {/* sellbooks */}
      {sellBooks &&


        <div className="min-h-screen flex flex-col items-center  py-10 text-center">
          <div className='bg-gray-200 text-black rounded-lg p-15 my-5 shadow-lg w-11/12 md:w-3/4 lg:w-2/3 '>

            <h1 className='text-2xl font-bold mb-5'>Book Details</h1>



            <form className='md:grid grid-cols-2 gap-6'>
              <div>
                <input value={bookDetails.title} onChange={(e) => setBookDetails({ ...bookDetails, title: e.target.value })} type="text" name="" id="" placeholder='Title' className="bg-white rounded w-full p-2" />
                <input value={bookDetails.author} onChange={(e) => setBookDetails({ ...bookDetails, author: e.target.value })} type="text" name="" id="" placeholder='Author' className="bg-white rounded w-full p-2 mt-3" />
                <input value={bookDetails.noOfPages} onChange={(e) => setBookDetails({ ...bookDetails, noOfPages: e.target.value })} type="text" name="" id="" placeholder='No of Pages' className="bg-white rounded w-full p-2 mt-3" />
                <input value={bookDetails.imageUrl} onChange={(e) => setBookDetails({ ...bookDetails, imageUrl: e.target.value })} type="text" name="" id="" placeholder='Image Url' className="bg-white rounded w-full p-2 mt-3" />
                <input value={bookDetails.price} onChange={(e) => setBookDetails({ ...bookDetails, price: e.target.value })} type="text" name="" id="" placeholder='Price' className="bg-white rounded w-full p-2 mt-3" />
                <input value={bookDetails.dPrice} onChange={(e) => setBookDetails({ ...bookDetails, dPrice: e.target.value })} type="text" name="" id="" placeholder='Discount Price' className="bg-white rounded w-full p-2 mt-3" />
                <textarea value={bookDetails.abstract} onChange={(e) => setBookDetails({ ...bookDetails, abstract: e.target.value })} name="" id="" placeholder='Abstract' rows={'8'} className='bg-white rounded  w-full  p-2 mt-3'></textarea>
              </div>

              <div>
                <input value={bookDetails.publisher} onChange={(e) => setBookDetails({ ...bookDetails, publisher: e.target.value })} type="text" name="" id="" placeholder='Publisher' className="bg-white rounded w-full p-2" />
                <input value={bookDetails.language} onChange={(e) => setBookDetails({ ...bookDetails, language: e.target.value })} type="text" name="" id="" placeholder='Language' className="bg-white rounded w-full p-2 mt-3" />
                <input value={bookDetails.isbn} onChange={(e) => setBookDetails({ ...bookDetails, isbn: e.target.value })} type="text" name="" id="" placeholder='ISBN' className="bg-white rounded w-full p-2 mt-3" />
                <input value={bookDetails.category} onChange={(e) => setBookDetails({ ...bookDetails, category: e.target.value })} type="text" name="" id="" placeholder='Category' className="bg-white rounded w-full p-2 mt-3" />

                <div className="flex flex-col items-center justify-center text-center mt-10">

                  {preview ?

                    <img src={preview} alt="" style={{ width: "200px", height: "200px" }} />

                    :
                    <label htmlFor="uploadfile">
                      <input onChange={(e) => handleFile(e)} type="file" name="" id="uploadfile" style={{ display: "none" }} />
                      <img src="https://cdn.pixabay.com/photo/2021/10/11/00/59/upload-6699084_1280.png" alt="" style={{ width: "200px", height: "200px" }} />
                    </label>
                  }

                  {
                    preview &&
                    <div className='mt-10 flex items-center gap-5'>
                      {
                        allUploadImages.map((item) =>
                          <img src={item} alt="" style={{ width: "50px", height: "50px" }} />

                        )
                      }



                      {allUploadImages.length < 3 &&

                        <label htmlFor="uploadfile" className='mt-4'>
                          <input onChange={(e) => handleFile(e)} type="file" name="" id="uploadfile" style={{ display: "none" }} />
                          <img src="https://cdn.pixabay.com/photo/2021/10/11/00/59/upload-6699084_1280.png" alt="" style={{ width: "200px", height: "200px" }} />
                        </label>

                      }
                    </div>
                  }


                </div>

                <div className='flex md:justify-end justify-center mt-5'>
                  <button type='button' onClick={reset} className='bg-red-600 text-white rounded px-5 py-3  hover:border hover:border-red-green-600 hover:text-red-600 hover:bg-white'>Reset</button>
                  <button type='button' onClick={handleAddBook} className='bg-green-600 text-white rounded px-5 py-3  hover:border hover:border-green-600 hover:text-green-600 hover:bg-white ms-3'>Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      }

      {/* book status */}

      {bookstatus &&
        <div className='p-10 my-20 shadow rounded'>

          {userAddedBooks?.length > 0 ?
            userAddedBooks?.map((book) => (
              <div className='bg-gray-200 p-5 rounded mt-4'>
                <div className='md:grid grid-cols-[3fr_1fr]'>
                  <div className='px-4'>
                    <h1 className='text-2xl'>{book?.title}</h1>
                    <h1>{book?.author}</h1>
                    <h3 className='text-blue-600'>{book?.price}</h3>
                    <p>{book?.abstract}</p>
                    <div className='flex mt-5'>

                      {book?.status == "pending" ?
                        <img src="https://www.psdstamps.com/wp-content/uploads/2022/04/round-pending-stamp-png.png" alt="" style={{ width: "70px", height: "70px" }} />

                        : book?.status == "approved" ?
                          <img src="https://juststickers.in/wp-content/uploads/2017/08/seal-of-approval.png" alt="" style={{ width: "70px", height: "70px" }} />
                          :
                          <img src="https://cdn-icons-png.flaticon.com/512/6188/6188726.png" alt="" style={{ width: "70px", height: "70px" }} />
                      }
                    </div>
                  </div>
                  <div className='px-4 mt-4 md:mt-4'>
                    <img src={book?.imageUrl} alt="" style={{ width: "200px", height: "200px" }} />
                    <div className='flex justify-end mt-4'>
                      <button onClick={() => handleDeleteBook(book?._id)} type='button' className='p-2 rounded bg-red-600 text-white hover:bg-gray-200 hover:text-red-600 hover:border hover:border-red-600'>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))

            :

            <div className='flex justify-center items-center flex-col'>
              <img src="https://i.pinimg.com/originals/b4/13/34/b41334a036d6796c281a6e5cbb36e4b5.gif" alt="" style={{ width: "200px", height: "200px" }} />
              <p className='text-red-600 text-2xl'>No Book Added Yet</p>

            </div>
          }

        </div>}


      {/* purchase history */}
      {/* {purchaseHistory &&

        <div className='p-10 my-20 shadow rounded'>
          
          <div className='bg-gray-200 p-5 rounded mt-4'>
            <div className='md:grid grid-cols-[3fr_1fr]'>
              <div className='px-4'>
                <h1 className='text-2xl'>Book Title</h1>
                <h1>Author Name</h1>
                <h3 className='text-blue-600'>₹ 599</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur itaque rerum ratione molestiae soluta dolore atque quas, quam ipsa illum, ipsam earum accusamus. Exercitationem, eos?
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque perferendis minima a sapiente, animi magnam natus asperiores, voluptates veritatis, deleniti facilis sequi? Animi molestias, mollitia saepe nisi odit totam impedit.
                </p>

              </div>
              <div className='px-4 mt-4 md:mt-4'>
                <img src="https://www.jkrowling.com/wp-content/uploads/2016/10/HPATCC_Hero_OnGrey.png" alt="" style={{ width: "200px", height: "200px" }} />
              </div>
            </div>
          </div>

          <div className='flex justify-center items-center flex-col'>
            <img src="https://i.pinimg.com/originals/b4/13/34/b41334a036d6796c281a6e5cbb36e4b5.gif" alt="" style={{ width: "200px", height: "200px" }} />
            <p className='text-red-600 text-2xl'>No Book brought Yet</p>

          </div>

        </div>

      } */}

      {/* purchase history */}


      {purchaseHistory && (
        <div className="p-4 my-10 shadow rounded w-full">
          {purchasedBooks && purchasedBooks.length > 0 ? (
            <div className="space-y-6">
              {purchasedBooks.map((book, index) => (
                <div key={index} className="bg-gray-200 p-6 rounded ">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex-1">
                      <h1 className="text-2xl font-semibold text-gray-800">{book?.title}</h1>
                      <h2 className="text-lg text-gray-600">{book?.author}</h2>
                      <h3 className="text-blue-600 font-bold mt-2">₹ {book?.price}</h3>
                      <p className="mt-3 text-gray-700">{book?.abstract}</p>
                    </div>
                    <div className="w-[200px] h-[200px] flex-shrink-0">
                      <img
                        src={book?.imageUrl}
                        alt={book?.title}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center flex-col">
              <img
                src="https://i.pinimg.com/originals/b4/13/34/b41334a036d6796c281a6e5cbb36e4b5.gif"
                alt="No books"
                style={{ width: "200px", height: "200px" }}
              />
              <p className="text-red-600 text-2xl">No Book bought Yet</p>
            </div>
          )}
        </div>
      )}
      <Footer />
    </>
  )
}

export default Profile


