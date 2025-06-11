import React, { useState, useEffect } from "react";

const Intervals = () => {

    useEffect(() => {
        console.log("effect - intervals");

        const interval = setInterval(() => {
            console.log("Intervals"); // it will still work after hide the element, so you need to clean the interval
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    });

    return (
        <>
            <h1>Intervals</h1>
        </>
    )
}

export default Intervals;