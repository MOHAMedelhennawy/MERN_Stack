// class component implementation
import React, { Component } from 'react';

class Product extends Component {
    state = {
        name: `shaurma`,
        count: 2,
    }; 

    getCountStyle() {
        return this.state.count <= 0 ? { color: "red" } : { color: "green" };
    }

    getButtonStyle() {
        return {
            color: "white",
            backgroundColor: "green",
            width: "3.2rem",
            height: "1.8rem",
        }
    }

    onClickActionHandler = (num) => {
        return () => {
            this.setState({ count: this.state.count + num });
        }
    };

    render() { 
        return (
            <div>
                <span>{ this.state.name }</span>
                <span style={ this.getCountStyle() }>{ this.state.count }</span>
                <button onClick={ this.onClickActionHandler(5) } style={ this.getButtonStyle() }>+</button>
            </div>
        );
    }
}

export default Product;
