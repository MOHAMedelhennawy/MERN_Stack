import Navbar from "./navbar";
import React, { Component } from "react";
import ShoppingCart from "./shoppingCart";

class App extends Component {
    state = {
        products: [
            {id: 1, name: "Burger", count: 2},
            {id: 2, name: "Pizza", count: 1},
            {id: 3, name: "Twist", count: 3},
        ]
    }

    deleteBtnHandler = (product) => {
        return () => {
            const products = this.state.products.filter((p) => p.id !== product.id);
            this.setState({ products });
        };
    }

    resetBtnHandler = () => {
        return () => {
            const products = [...this.state.products];
            products.map((product) => product.count = 0)
            this.setState({ products });
        }
    }

    incrementHandler = (product) => {
        return () => {
            const products = this.state.products.map(p =>
                 p.id === product.id ? { ...p, count: p.count + 1 } : p
            );

            this.setState({ products });
        }
    };

    render() {
        return (
            <React.Fragment>
                <Navbar productsCount={ this.state.products.length }/>
                <ShoppingCart
                    products={ this.state.products }
                    onReset={ this.resetBtnHandler }
                    onDelete={ this.deleteBtnHandler }
                    onIncrement={ this.incrementHandler }
                />
            </React.Fragment>
        )
    }
}

export default App;