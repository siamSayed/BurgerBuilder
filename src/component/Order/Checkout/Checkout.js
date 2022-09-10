import React, { Component } from 'react';
import "./Checkout.css"
import {Button,Modal,ModalBody}  from "reactstrap"
import {connect} from "react-redux"
import axios from "axios"
import Loading from '../../loading/Loading';
import { resetIngredients } from '../../redux/actionCreator';


const stateToProps=(state)=>{
    return {
        ingredients:state.ingredients,
        totalPrice:state.totalPrice,
        isAvailablePurchase:state.isAvailablePurchase,
        id:state.localId,
        token:state.idToken,
        state:state
    }
}
const dispatchToProps=(dispatch)=>{
        return {
            resetIngredients:()=>dispatch(resetIngredients()),

        }
}
class Checkout extends Component {
    
    state={
        values:{
        name:"",
        phone:"",
        address:"",
        paymentType:"Cash on delivery",
        },
        isloading:false,
        modalIsOpen:false,
        modalTxt:''

    }
    inputChange=(e)=>{
       
        this.setState({
            values:{
                ...this.state.values,

                [e.target.name]:e.target.value
            }
            
        })
        
    }
    submitted=(e)=>{
        this.setState({isloading:true})
        e.preventDefault()
        const totalInfo={
            order:this.props.ingredients,
            user:this.state.values,
            totalPrice:this.props.totalPrice,
            date: new Date(),
            id:this.props.id

        }
        axios.post("https://burger-builder-5dfa7-default-rtdb.firebaseio.com/data.json?auth="+ this.props.token, totalInfo)
        .then(res=>{
            if(res.status===200){
                this.setState({
                    modalIsOpen:true,
                    modalTxt:"your order is placed"
                })
            }
            setTimeout(()=>{
                this.setState({
                    modalIsOpen:false,
                    modalTxt:''
                })
            },3000)
            this.setState({isloading:false})
        })
        .catch(err=>{
            this.setState({
                modalIsOpen:true,
                modalTxt:err.message
            })
            setTimeout(()=>{
                this.setState({
                    modalIsOpen:false,
                    modalTxt:''
                })
            },3000)
            this.setState({isloading:false})
        })
        this.props.resetIngredients()
        this.setState({
            values:{
                ...this.state.values,
                name:'',
                phone:'',
                address:'',
                paymentType:'',

            }
            

        })
        

    }
    
    render() {
        const form=(
            <div className="">
               
            <div className="totalPrice">
            <ul>
                    {this.props.ingredients.map(a=>{
                        return <li key={Math.random()}>{a.type} : {a.amount}</li>
                    })}
            </ul>    
            your total price is : {this.props.totalPrice} BDT</div>
            <form className='checkout_form' >
                <label htmlFor='name'>Enter name</label>
                <input name="name" id="name"type="text" placeholder="Enter name" value={this.state.values.name} onChange={(e)=>this.inputChange(e)} className="from-control"/>
                <label htmlFor='phone'>Enter phone number</label>
                <input type="tel" name="phone"placeholder='Enter phone number' id="phone" value={this.state.values.phone} onChange={(e)=>this.inputChange(e)} className="from-control"/>
                <label htmlFor='address'>Enter address</label>
                <textarea name="address" id="address" cols="10" rows="10"placeholder='Enter your address'value={this.state.values.address} onChange={(e)=>this.inputChange(e)} className="from-control">

                </textarea>
                <div className="payment_section">
                <label htmlFor='payment'>enter your payment type</label>
                <select name="paymentType" id="payment"value={this.state.values.paymentType} onChange={(e)=>this.inputChange(e)} className="from-control">
                    <option value="cash on delivery">Cash on delivery</option>
                    <option value="bkash">Bkash</option>
                </select>
                </div>
                <Button type="submit"disabled={!this.props.isAvailablePurchase} value="submit" onClick={(e)=>this.submitted(e)}>submit</Button>

            </form>
            </div>
        )
        console.log(this.props.state)
        return (
            
            <div className="checkout">
                <Modal isOpen={this.state.modalIsOpen} href="/">
                    <ModalBody>
                            {this.state.modalTxt}
                    </ModalBody>
                </Modal>
                {this.state.isloading===true ?<Loading/>: form}
            </div>
        );
    }
}

export default connect(stateToProps,dispatchToProps)(Checkout);