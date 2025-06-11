import React from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Product = (props) => {
    const { product, onIncrement, onDelete } = props;

    const getCountStyle = (product) => {
        return product.count <= 0 ? { color: "red" } : { color: "green" };
    };

    const getButtonStyle = () => {
        return {
            color: "white",
            backgroundColor: "green",
            width: "3.2rem",
            height: "1.8rem",
            marginLeft: "10px"
        };
    };

    const getTrashStyle = () => {
        return {
            color: "red",
            cursor: "pointer",
            marginLeft: "20px"
        };
    };

    return (
        <div>
            <span>{ product.name }</span>
            <span style={ getCountStyle(product) }>{ product.count }</span>
            <button onClick={ onIncrement(product) } style={ getButtonStyle() }>+</button>
            <i onClick={ onDelete(product) } style={ getTrashStyle() }><FontAwesomeIcon icon={faTrash} /></i>
        </div>
    );
}

export default Product;
