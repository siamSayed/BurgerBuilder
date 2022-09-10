import React, { Component } from 'react';

import Burger from './Burger/Burger';
import Controls from './controls/Controls';
import "./BurgerBuilder.css";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button} from "reactstrap"
import { addIngredients, removeIngredients, updateIsPuchaseAvailable } from '../redux/actionCreator';
import {connect} from "react-redux"
import { Link} from 'react-router-dom';
import axios from "axios"
const stateToProps=(state)=>{
    return {
        ingredients:state.ingredients,
        totalPrice:state.totalPrice,
        isAvailablePurchase:state.isAvailablePurchase
    }
}
const mapDispatchToProps=(dispatch)=>{
      return {
        addIngredients:(item)=>dispatch(addIngredients(item)),
        removeIngredients:(item)=>dispatch(removeIngredients(item)),
        updateIsPuchaseAvailable:()=>dispatch(updateIsPuchaseAvailable())
      }
}
class burgureBuilder extends Component {
   
    state={
        isOpen:false
    }
    
    
    addIngredientHandle=(item)=>{
        this.props.addIngredients(item)
        this.props.updateIsPuchaseAvailable()
        

        
        
        
    }
    removeIngredientHandler=(item)=>{
        this.props.removeIngredients(item)
        this.props.updateIsPuchaseAvailable()
        
    }
    toggle=()=>{
        this.setState({isOpen:!this.state.isOpen})
    }
    
    

    
    
    
    render() {
        
        return (
            <div>
                
                <div className="contents">
                <Burger ingredients={this.props.ingredients}/>
                <Controls 
                ingredients={this.props.ingredients}
                add={this.addIngredientHandle}
                remove={this.removeIngredientHandler}
                totalPrice={this.props.totalPrice}
                toggle={this.toggle}
                isAvailablePurchase={this.props.isAvailablePurchase}
               
                />
                </div>
            <Modal isOpen={this.state.isOpen}>
                <ModalHeader>
                        Your order
                </ModalHeader>
                <ModalBody is>
                    
                    <strong>your bill : {this.props.totalPrice}</strong>


                </ModalBody>
                <ModalFooter>
                    <Link color='success' to="/checkout">Checkout</Link>
                    <Button color='danger' onClick={this.toggle}>Exit</Button>
                </ModalFooter>
            </Modal>
            </div>
            

        );
    }
}

export default connect(stateToProps ,mapDispatchToProps)(burgureBuilder);