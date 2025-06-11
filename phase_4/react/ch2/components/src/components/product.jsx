// class component implementation
import React, { Component } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class Product extends Component {

    getCountStyle() {
        return this.props.product.count <= 0 ? { color: "red" } : { color: "green" };
    }

    getButtonStyle() {
        return {
            color: "white",
            backgroundColor: "green",
            width: "3.2rem",
            height: "1.8rem",
            marginLeft: "10px"
        }
    }

    getTrashStyle() {
        return {
            color: "red",
            cursor: "pointer",
            marginLeft: "20px"
        }
    }

    render() { 
        return (
            <div>
                { this.props.children }
                <span>{ this.props.product.name }</span>
                <span style={ this.getCountStyle() }>{ this.props.product.count }</span>
                <button onClick={ this.props.onIncrement(this.props.product) } style={ this.getButtonStyle() }>+</button>
                <i onClick={ this.props.onDelete(this.props.product) } style={ this.getTrashStyle() }><FontAwesomeIcon icon={faTrash} /></i>
            </div>
        );
    }
}

export default Product;
