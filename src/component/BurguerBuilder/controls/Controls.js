import React, { Component } from 'react';
import "./Controls.css"
import {AiOutlinePlusCircle} from "react-icons/ai"
import {AiOutlineMinusCircle} from "react-icons/ai"
import { Button } from 'reactstrap';
const ingredientsLableType=[
    {label:"SAUCE",type:"burgerSauce"},
    {label:"LETTUS", type:"burgerLettus"},
    {label:"PATTY",type:"burgerPatty"}

]
class IngredientSelection extends Component{
    render(){
        return(
            <div className="ingredientSelection">
                <div className="itemName">{this.props.label}</div>
                <div className="btns">
                <AiOutlinePlusCircle className='icons add' onClick={this.props.add}/>
                <AiOutlineMinusCircle className='icons remove'onClick={this.props.remove}/>
                </div>
                
            </div>
        )
    }
}


class Controls extends Component {
    render() {
        
        return (
            <div className="controls_waper">
            <div className='controls'>
                <div className="titleTxt">
                    <p>Choose your ingridients here</p>
                </div>
                <div className="ingredient_section">
                {ingredientsLableType.map((items,index)=>{
                    return <IngredientSelection 
                    label={items.label}
                    type={items.type}
                    add={()=>this.props.add(items.type)}
                    remove={()=>this.props.remove(items.type)}
                    key={index}/>
                })}
                </div>
                <div className="total_price">
                    <p>Total price : {this.props.totalPrice} bdt</p>
                </div>
                <Button className="submit" disabled={!this.props.isAvailablePurchase}onClick={this.props.toggle}>submit</Button>
            </div>
        </div>
        );
    }
}

export default Controls;