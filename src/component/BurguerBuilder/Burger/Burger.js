import React, { Component } from 'react';
import Ingredients from '../Ingredients/Ingredients';
import "./Burger.css"
class Burger extends Component {
    
    
    render() {
        let ingredientsArr=this.props.ingredients.map(item=>{
            let ingredientsIterate=[...Array(item.amount).keys(Math.random())]
            return ingredientsIterate.map(_ =>{
                return <Ingredients type={item.type} key={Math.random()}/>
            })
        }).reduce((arr,item)=>{
            return arr.concat(item)
        })
        if(ingredientsArr.length===0){
            ingredientsArr=<p className='IngredientNull'>your ingredients gose here</p>
            
        }
        
        
        return (
            <div className='burger'>
                <Ingredients type="burgerTop"/>
                {ingredientsArr}
                <Ingredients type="burgerBottom"/>

            </div>
        );
    }
}

export default Burger;