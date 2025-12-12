

import commonAPI from "./commonAPI"
import SERVERURL from "./serverURL"

//register

export const registerAPI = async (reqBody)=>{
    return await commonAPI("POST", `${SERVERURL}/register`,reqBody)  //post add
}

//login
export const loginAPI = async (reqBody)=>{
    return await commonAPI("POST", `${SERVERURL}/login`,reqBody)  //post add
}


//google login

export const googleloginAPI = async (reqBody)=>{
    return await commonAPI("POST", `${SERVERURL}/google-login`,reqBody)  //post add
}


//get home book

export const getHomeBookAPI = async ()=>{
    return await commonAPI("GET", `${SERVERURL}/home-books`)
}


//----user-----

export const addBookAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("POST", `${SERVERURL}/add-book`,reqBody,reqHeader)
}

// get all books  -- here we dont have reqbody so we add an empty {} 
export const getAllBooksAPI = async (searchkey, reqHeader)=>{
    return await commonAPI("GET", `${SERVERURL}/all-books?search=${searchkey}`,{},reqHeader)
}

//get a book
export const getABookAPI = async (bookid ,reqHeader)=>{
    return await commonAPI("GET", `${SERVERURL}/view-books/${bookid}`,{}, reqHeader)
}

//get user added books
export const getUserBooksAPI = async (reqHeader)=>{
    return await commonAPI("GET",`${SERVERURL}/userbooks`,{},reqHeader)
}

//delete user added books
export const deleteAUserAddedBookAPI = async (id)=>{
    return await commonAPI("DELETE", `${SERVERURL}/delete-book/${id}`)
}

//get user purchased books
export const getPurchasedBooksAPI = async (reqHeader)=>{
    return await commonAPI("GET",`${SERVERURL}/purchase-history`, {}, reqHeader)
}

//update user profile
export const updateProfileAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVERURL}/update-user-profile`,reqBody,reqHeader)
}

//make payment
export const makePaymentAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVERURL}/make-payment`,reqBody,reqHeader)


}

//---------------admin--------

//get all books admin

export const getAllBooksAdminAPI = async ()=>{
    return await commonAPI("GET",`${SERVERURL}/get-allbooks`)
}

//approve book status
export const approveBookAPI = async (id)=>{
    return await commonAPI("PUT",`${SERVERURL}/update-book/${id}`)
}

//get all users

export const getAllUsersAPI = async(reqHeader)=>{
    return await  commonAPI("GET",`${SERVERURL}/get-allusers`,{},reqHeader)
}


export const updateAdminProfileAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVERURL}/update-admin-profile`,reqBody,reqHeader)
}