import Product from "./product";
import React, { Component } from "react";

class ShoppingCart extends Component {
    getResetBtnStyle() {
        return {
            color: "white",
            backgroundColor: "blue",
        }
    }

    render() {
        return (
            // React.Fragment is a component in React that allows you to group multiple elements without adding an extra node to the DOM
            <React.Fragment> 
                <h1>Hello, World</h1>
                <button onClick={ this.props.onReset() } style={ this.getResetBtnStyle() }>Reset</button>
                { this.props.products.map(product => (
                    <Product 
                        key={ product.id }
                        product={ product }
                        onDelete={ this.props.onDelete }
                        onIncrement={ this.props.onIncrement }
                    >
                        <h4>{ product.id }</h4>
                    </Product>
                ))}
            </React.Fragment>
        );
    }
}

export default ShoppingCart;
