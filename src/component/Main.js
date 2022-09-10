import React, { Component } from 'react';
import BurgerBuilder from "./BurguerBuilder/BurguerBuilder"
import Header from '../component/Header/Header';
import { Route,Routes,Navigate} from 'react-router-dom';
import Order from "../component/Order/Order"
import Checkout from "../component/Order/Checkout/Checkout"
import Auth from "./Auth/Auth"
import {connect} from "react-redux"
import { authCheck } from './redux/actionCreator';
import Logout from "../component/Auth/Logout"
const mapDispatchToProps=(dispatch)=>{
    return {
        authCheck:()=>dispatch(authCheck())
    }
}
const mapStateToProps=(state)=>{

        return {
            idToken: state.idToken,
            localId: state.localId
          }

}
class Main extends Component {
    componentDidMount(){
        this.props.authCheck()
    }
    render() {
        return (
            <div>
            <Header/>
            <Routes>
            {this.props.idToken!=null && this.props.localId!=null ?
            <>
            <Route path='/' element={<BurgerBuilder/>}/>
            <Route path="checkout" element={<Checkout/>}/>
            <Route path="/order" element={<Order/>}/>
            <Route path="/login-signup"element={<Navigate to="/"/>}/>
            </>
            :null}
            <Route path="/login-signup" element={<Auth/>}/>
            <Route path="/"element={<Navigate to="/login-signup"/>}/>
            <Route path="logout" element={<Logout/>}/>
            </Routes>

            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Main);