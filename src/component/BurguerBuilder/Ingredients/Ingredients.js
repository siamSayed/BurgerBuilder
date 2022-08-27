import React, { Component } from 'react';
import burgerTop from "../../../assets/images/burgerTop.svg"
import burgerBottom from "../../../assets/images/burgerBottom.svg"
import burgerSauce from "../../../assets/images/burgerSauce.svg"
import burgerLettus from "../../../assets/images/burgerLettus.svg"
import burgerPatty from "../../../assets/images/burgerPatty.svg"

class Ingredients extends Component {
    
    render() {
        let ingredients=null;
        
        switch(this.props.type){
            case "BURGER_TOP":
            ingredients=<img src={burgerTop} alt="burgerTop"/>
            break
            case "BURGER_SAUCE":
            ingredients=<img src={burgerSauce} alt="burgerSauce"/>
            break
            case "BURGER_PATTY":
            ingredients=<img src={burgerPatty} alt="burgerPatty"/>
            break
            case "BURGER_LETTUS":
            ingredients=<img src={burgerLettus} alt="burgerLettus"/>
            break
            case "BURGER_BOTTOM":
            ingredients=<img src={burgerBottom} alt='burgerBottom'/>
            break
        }
        return (
            <div>
                {ingredients}
            </div>
        );
    }
}

export default Ingredients;