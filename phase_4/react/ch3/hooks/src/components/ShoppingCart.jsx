import React, { useState } from "react";
import Product from "./Product";

const ShoppingCart = (props) => {
    const { products, onIncrement, onDelete, onReset } = props;

    const getResetBtnStyle = () => {
        return {
            color: "white",
            backgroundColor: "blue",
        }
    }

    return (
        <div>
            <button onClick={ onReset() } style={ getResetBtnStyle() }>Reset</button>
            {products.map(product => (
                <Product
                    key={ product.id }
                    product={ product }
                    onIncrement={ onIncrement }
                    onDelete={ onDelete }
                />
            ))}
        </div>
    )
}

export default ShoppingCart;