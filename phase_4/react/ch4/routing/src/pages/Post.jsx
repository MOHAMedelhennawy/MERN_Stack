import React from 'react';
import { useParams, useSearchParams } from "react-router-dom";

const Post = () => {
    const { id } = useParams();
    const [ urlSearchParams ] = useSearchParams();

    console.log(urlSearchParams.toString())
    return ( <h1>Post ID: {id}</h1> );
}
 
export default Post;