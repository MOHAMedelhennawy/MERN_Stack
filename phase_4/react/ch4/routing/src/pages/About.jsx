import React from 'react';
import { useNavigate } from "react-router-dom";

const About = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/")
    };

    return(
        <>
            <h1>About</h1>
            <button onClick={ handleClick }>Go to home</button>
        </>
    )
}

export default About;
