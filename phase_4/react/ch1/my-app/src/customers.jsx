// class component implementation
import React, { Component } from 'react';

class Customers extends Component {
    state = {
        names: ["Ahmed", "Mohammed", "Mostafa"],
    }; 

    renderNames() {
        if (this.state.names.length <= 0) {
            return <h2>No names</h2>
        } else {
            return (
                <ul>
                    { this.state.names.map(name => <li key={ name }>{ name }</li> ) }
                </ul>
            )
        }
    }

    render() { 
        return (
            <div>
                {/* How to render list */}

                {/* ============== Method #1 ============== */}
                { this.renderNames() }


                {/* ============== Method #2 ============== */}
                { this.state.names = [] }
                { this.state.names.length <= 0 && <h4>No names</h4> } {/* it's return first false or last true value. */}
                <ul>
                    { this.state.names.map(name => <li key={ name }>{ name }</li>) }
                </ul>


                {/* ============== Method #3 ============== */}
                {
                    this.state.names.length <= 0
                        ? <h4>No names</h4>
                        : <ul>{ this.state.names.map(name => <li key={ name }>{ name }</li>) }</ul>
                }
                
            </div>
        );
    }
}

export default Customers;
