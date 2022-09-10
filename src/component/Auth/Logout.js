import React, { Component } from 'react';
import {connect} from "react-redux"
import { Router,Route,Navigate} from 'react-router-dom';
import { logout } from '../redux/actionCreator';
const mapDispatchToProps=(dispatch)=>{
    return {
        logout:()=>dispatch(logout())
    }
}

class Logout extends Component {
    componentDidMount(){
        this.props.logout()
    }
    render() {
        return (
            
            <Navigate to="/login-signup"/>
            
        );
    }
}

export default connect(null,mapDispatchToProps)(Logout);