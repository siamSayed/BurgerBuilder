import React, { Component } from 'react';
import Header from '../Header/Header';
import Burger from './Burger/Burger';
class burgureBuilder extends Component {
    state = {
        ingredients: [
            
            {
                type: "BURGER_SAUCE",
                amount: 1
            },
            {
                type: "BURGER_LETTUS",
                amount: 1
            },
            {
                type: "BURGER_PATTY",
                amount: 1 
            }
        ]
    }
    render() {
        return (
            <div>
                <Header />
                <Burger ingredients={this.state.ingredients}/>
            </div>
        );
    }
}

export default burgureBuilder;