import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import ShoppingCart from "./ShoppingCart";
import Intervals from "./Interval";

const App = () => {
    const [products, setProducts] = useState([
        {id: 1, name: "Burger", count: 2},
        {id: 2, name: "Pizza", count: 1},
        {id: 3, name: "Twist", count: 3},
    ]);

    const [show, setShow] = useState(true);

    // 1 - without dependencies => Execute after the first render and every render
    // 2 - empty dependencies array => Execute after the first render only
    // 3 - with dependencies => Execute after any dependencies updates

    useEffect(() => {   // Case 3
        console.log("useEffect")

        return () => {
            console.log("Clean up")
        }
    }, [products])

    const onIncrementHandler = (product) => {
        return () => {
            const newProducts = products.map(p => (
                p.id === product.id ? { ...p, count: p.count + 1 } : p
            ));

            setProducts(newProducts);
        };
    };

    const onDeleteHandler = (product) => {
        return () => {
            const newProducts = products.filter(p => p.id !== product.id);
            setProducts(newProducts);
        };
    };

    const onResetHandler = () => {
        return () => {
            const newProducts = products.map(p => ({ ...p, count: p.count = 0 }))
            setProducts(newProducts);
        }
    };

    return(
        <React.Fragment>
            <button onClick={() => setShow(!show)}>Show/Hide</button>
            {show && <Intervals/>}
            <Navbar productsCount={ products.length }/>
            <ShoppingCart
                products={ products }
                onIncrement={ onIncrementHandler }
                onDelete={ onDeleteHandler }
                onReset={ onResetHandler }
            />
        </React.Fragment>
    );
}

export default App;