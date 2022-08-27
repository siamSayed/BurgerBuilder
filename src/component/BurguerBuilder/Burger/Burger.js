import React, { Component } from 'react';
import Ingredients from '../Ingredients/Ingredients';
import burgerTop from "../../../assets/images/burgerTop.svg"
import "./Burger.css"
class Burger extends Component {
    
    
    render() {
        let ingredientsArr=this.props.ingredients.map(item=>{
            let ingredientsAmount=[...Array(item.amount).keys(Math.random)]
            return ingredientsAmount.map(_=>{
                return <Ingredients type={item.type} key={Math.random()}/>
            })
        }).reduce((arr,items)=>{
            return arr.concat(items)

        },[])
        if(ingredientsArr.length===0){
            ingredientsArr= <p className='IngredientNull'>Ingridients gose here</p>
        }
        
        
        return (
            <div>
                <Ingredients type="BURGER_TOP"/>
                {ingredientsArr}
                <Ingredients type="BURGER_BOTTOM"/>

            </div>
        );
    }
}

export default Burger;