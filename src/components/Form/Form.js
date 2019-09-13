import React, { Component } from "react";
import axios from "axios";

class Form extends Component {
  state = {
    name: "",
    price: "",
    img: "",
    products: [],
    id: 0,
    index: 0
  };

  componentDidMount() {
    this.getProducts();
  }

  getProducts = () => {
    axios
    .get(`/api/products`)
    .then(res => {
      this.setState({
        products: res.data,
        img: res.data[res.data.length - 1].img
      });
    })
    .catch(error => {
      alert(error);
    });
   
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  addProduct = () => {
    const { name, price, products, img } = this.state;
    axios.post(`/api/products`, { name, price, products, img }).then(res => {
      this.setState({ products: res.data });
      console.log(res.data);
    });
    window.location.reload();
  };

  render() {
   
    return (
      <div>
      <span>Img:</span>
        <input
          type="text"
          name="img"
          onChange={this.handleChange}
          placeholder="img"
          defaultValue='https://www.stockvault.net/data/2010/10/12/115317/thumb16.jpg'
        />
        
        <span>Product Name:</span>
        <input
          type="text"
          name="Product name"
          onChange={this.handleChange}
          placeholder="Product Name"
        />

        <span>Price:</span>
        <input
          type="text"
          name="price"
          onChange={this.handleChange}
          placeholder="Price"
        />
        <img  src="" alt="" />
        <div className='button'>
        <button onClick={this.addProduct}>Add to inventory</button>
        <button onClick={this.getProducts}>Cancel</button>
        </div>
       
      </div>
    );
  }
}

export default Form;

//will this work for the cancel / or is it gonna delete the entire id?
//cancel must clear all input boxes then reset to empty
