import * as actionTypes from "./actionTypes"

const ingredientPrice = {
    burgerSauce: 20,
    burgerLettus: 30,
    burgerPatty: 60
}

const ingredientElements = {
    ingredients: [
        { type: "burgerSauce", amount: 0 },
        { type: "burgerLettus", amount: 0 },
        { type: "burgerPatty", amount: 0 }
    ],
    totalPrice: 80,
    isAvailablePurchase: false,
    orders:[],
    ordersLoading:true,
    orderFailedMsg:null,
    idToken:null,
    localId:null,
    isLoading:false,
    errorMsg:null
}

export const reducer = (state = ingredientElements, action) => {
    const ingredients = [...state.ingredients]
    switch (action.type) {

        case actionTypes.ADD_INGREDIENTS:
            for (let i = 0; i < ingredients.length; i++) {
                let mapped = ingredients[i]
                if (mapped.type === action.payload) mapped.amount++
            }

            return {
                ...state,
                ingredients: ingredients,
                totalPrice: state.totalPrice + ingredientPrice[action.payload]
            }
        case actionTypes.REMOVE_INGREDIENT:
            for (let i = 0; i < ingredients.length; i++) {
                
                for (let i = 0; i < ingredients.length; i++) {
                    let mapped = ingredients[i]
                    
                    //for amount
                    if (mapped.type === action.payload) {
                        if (mapped.amount <= 0) return state;
                        mapped.amount--;
                    }
                    
                }
                return {
                    ...state,
                    ingredients:ingredients,
                    totalPrice: state.totalPrice - ingredientPrice[action.payload]
                    
                    
                }
                
            }
            return {
                ...state,
                ingredients: ingredients,
                totalPrice: state.totalPrice - ingredientPrice[action.payload]
            }
        case actionTypes.UPDATE_IS_AVAILABLE_PUCHASE:
            let sum = ingredients.reduce((sum, add) => {
                return sum + add.amount
            }, 0)
            console.log(sum>0)
            return {
                ...state,
                isAvailablePurchase: sum > 0


            }
        case actionTypes.RESET_INGREDIENTS:
            
        return {
            ...state,
            ingredients:[
                { type: "burgerSauce", amount: 0 },
                { type: "burgerLettus", amount: 0 },
                { type: "burgerPatty", amount: 0 }
            ],
            totalPrice: 80,
            isAvailablePurchase: false
        }
        case actionTypes.LOAD_ORDERS_SUCCESS:
            const orders=[]
            for(let itemId in action.payload){
                orders.push({
                    ...action.payload[itemId],
                    key:itemId,
                    
                })

            }
            return{
                ...state,
                orders:orders,
                ordersLoading:false,
                orderFailed:false
            }
        case actionTypes.LOAD_ORDERS_FALIED:
            return {
                ...state,
                orders:action.payload,
                orderFailedMsg:action.payload
            }
        //auth cases
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                idToken:action.payload.token,
                localId:action.payload.id

            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                idToken:null,
                localId:null
            }
        case actionTypes.AUTH_LOADING:
            return {
                ...state,
                isLoading:false,
                errorMsg:null
            }
        case actionTypes.AUTH_FAILED:
            return {
                ...state,
                isLoading:false,
                errorMsg:action.payload
            }

        default:
            return state


    }
}