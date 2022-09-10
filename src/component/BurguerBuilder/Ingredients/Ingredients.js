import React, { Component } from 'react';
import burgerTop from "../../../assets/images/burgerTop.svg"
import burgerBottom from "../../../assets/images/burgerBottom.svg"
import burgerSauce from "../../../assets/images/burgerSauce.svg"
import burgerLettus from "../../../assets/images/burgerLettus.svg"
import burgerPatty from "../../../assets/images/burgerPatty.svg"

class Ingredients extends Component {

    render() {
        let ingredients=null
        switch (this.props.type) {
            case "burgerTop":
                return ingredients= <img src={burgerTop} alt="burgerTop" />
                break
            case "burgerBottom":
                return ingredients= <img src={burgerBottom} alt="burgerBottom" />
                break
            case "burgerLettus":
                return ingredients= <img src={burgerLettus} alt="burgerLettus" />
                break
            case "burgerSauce":
                return ingredients= <img src={burgerSauce} alt="burgerSauce" />
                break
            case "burgerPatty":
                return ingredients= <img src={burgerPatty} alt="burgerPatty" />
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