import React, { Component } from 'react';
import { connect } from "react-redux"
import "./Order.css"

import { fetchOrders } from "../redux/actionCreator"
const dispatchToProps = (dispatch) => {
    return {
        fetchOrders: (token,id) => dispatch(fetchOrders(token,id))
    }
}
const stateToProps = (state) => {
    return {
        orders: state.orders,
        token:state.idToken,
        id:state.localId
    }
}
class Order extends Component {
    componentDidMount() {
        this.props.fetchOrders(this.props.token,this.props.id)

    }
    render() {
        
        let map = this.props.orders.map(a => {
           
            return (
                <div className="order" key={a.key}>
                    <div className="orderId">ORDER-ID :{a.key}</div>
                    <div className="orderList">
                        <ul className='orderItems'>
                        {a.order.map((a,i)=>{
                            return (
                                
                                    <button className="orderItem" key={i}>{a.type}({a.amount}X)</button>
                                
                                
                            )
                        })}
                        </ul>
                    </div>
                    <div className="orderPrice">Your total bill is : {a.totalPrice} tk</div>
                    <div className="orderDate">Order issued on : {a.date} </div>

                </div>
            )
           
            
        })

        return (
            <div className="totalOrders">
                <div className="orders">
                    {this.props.orders.length !== 0 ? map : null}

                </div>
            </div>
        );
    }
}

export default connect(stateToProps, dispatchToProps)(Order);