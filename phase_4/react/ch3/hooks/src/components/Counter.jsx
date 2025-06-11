import React, { useState } from "react";

const Counter = () => {
    const [ state, setState ] = useState({ counter: 0, name: "Ahmed"});

    const increment = () => {
        setState({ ...state, counter: state.counter + 1 });
    };

    const incrementByNumber = (number) => {
        /**
         * You may think in case that a number equal to 5, then counter will increase 5.
         * 
         * No, it will increase just 1. because setCounter not update counter immediately.
         */

        // for (let i = 0; i < number; i++) {
        //     setCounter(counter + 1);
        // }

        // The sulotion that u use prevState
        for (let i = 0; i < number; i++) {
            setState(prevState => ({ ...prevState, counter: prevState.counter + 1 }));
        }
    };

    return (
        <>
            <h1>Name: { state.name }</h1>
            <h1>Counter: { state.counter }</h1>
            <button onClick={ increment }>+</button>
            <button onClick={ () => incrementByNumber(5) }>+5</button>
        </>
    )
}

export default Counter;