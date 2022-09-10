import * as actionTypes from "./actionTypes"
import axios from "axios"


export const addIngredients=(item)=>{
    return {
        type:actionTypes.ADD_INGREDIENTS,
        payload:item
    }
}

export const removeIngredients=(item)=>{
    return {
        type:actionTypes.REMOVE_INGREDIENT,
        payload:item
    }
}

export const updateIsPuchaseAvailable=()=>{
    return {
        type:actionTypes.UPDATE_IS_AVAILABLE_PUCHASE
    }
}
export const resetIngredients=()=>{
    return {
        type:actionTypes.RESET_INGREDIENTS
    }
}
export const loadOrdersSuccess=(orders)=>{
    return {
        type:actionTypes.LOAD_ORDERS_SUCCESS,
        payload:orders
    }
}

export const loadOrdersFalied=()=>{
    return {
        type:actionTypes.LOAD_ORDERS_FALIED,

    }
}



export const fetchOrders=(token,id)=>  dispatch =>{
    let query=`&orderBy="id"&equalTo="${id}"`
         axios.get("https://burger-builder-5dfa7-default-rtdb.firebaseio.com/data.json?auth=" + token + query)
        .then(response=>{
            dispatch(loadOrdersSuccess(response.data))
        })
        
    }


//auth action creators
export const authSuccess=(token,id)=>{
    return {
        type:actionTypes.AUTH_SUCCESS,
        payload:{
            token:token,
            id:id
        }
    }
}
export const logout=()=>{ 
    localStorage.removeItem("token")
    localStorage.removeItem("id")
    localStorage.removeItem("expireationTime")
    return {
        type:actionTypes.AUTH_LOGOUT,
        
    }
}
export const authLoading=(isLoading)=>{
    return {
        type:actionTypes.AUTH_LOADING,
        payload:isLoading
    }
}
export const authFailed=(errormsg)=>{
    return {
        type:actionTypes.AUTH_FAILED,
        payload:errormsg
    }
}

export const auth =(email,password,mode)=>dispatch=>{
    dispatch(authLoading(true))

    const authData={
    email:email,
    password:password,
    secureToken:true,
    
    
    }
    let authLink=null
    if(mode==="sign Up"){
        authLink="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="
    }else{
        authLink="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="
    }
    const API_KEY="AIzaSyChlePU89B1KIOIjLU0JCba00iQl1DGUSY"
    axios.post(`${authLink}${API_KEY}`,authData)
    .then(res=>{
       
        let availableTime=new Date().getTime() + 3600 *1000
        let totalTime=new Date(availableTime)
        localStorage.setItem("token",res.data.idToken)
        localStorage.setItem("id",res.data.localId)
        localStorage.setItem("expireationTime",totalTime)
        

        dispatch(authSuccess(res.data.idToken,res.data.localId))
    })
    .catch(err=>{
        dispatch(authLoading(false))
        dispatch(authFailed(err.response.data.error.message))
    })
    }
    


export const authCheck=()=>dispatch=>{
    const availableTime=new Date(localStorage.getItem("expireationTime"))
    const token=localStorage.getItem("token")
    const id=localStorage.getItem("id")
    if(!token){
        //logout
        dispatch(logout())
        

    }else{
        if(new Date() < availableTime){
            //login
            dispatch(authSuccess(token,id))
        }else{
            //logout
        }
    }
}
