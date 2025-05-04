import React, { Component } from 'react';

class Product extends Component {
    state = {
        name: `shaurma`,
        count: 5
    }; 

    render() { 
        return ( 
            <div>
                <span>{ this.state.name }</span>
                <span>{ this.state.count }</span>
                {/* <span className="badge badge-primary m-2">5</span> */}
            </div>
        );
    }
}

export default Product;
