import React, { Component } from 'react';
import Product from '../Product/Product'



class Dashboard extends Component {
    state = {  }
    render() { 
        return ( <div>
            <h1>Inventory List</h1>
            <Product/>
            </div> );
    }
}
 
export default Dashboard;
