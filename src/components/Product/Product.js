import React, { Component } from "react";
import axios from 'axios'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

class Product extends Component {
  state = {
    name: "",
    price: "",
    image_url: "https://www.stockvault.net/data/2010/10/12/115317/thumb16.jpg",
    products: [],
    id: 0,
    index: 0,
    editing: false
  };

  addProduct = () => {
    const { name, price, image_url } = this.state;
    axios.post(`/api/products`, { name, price, image_url }).then(res => {
      // this.setState({ products: res.data });
      console.log(res.data);
    });
    //this enables me to change location path similar to link tags
    this.props.history.push('/Inventory')
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };




  render() {
    return (
      <Main>
      <Img src={this.state.image_url} alt="" />
      <h1>
        Product Name:
        <input
          type="text"
          name="name"
          onChange={this.handleChange}
          placeholder="Product Name"
        />
      </h1>

      <h1>
        Price:
        <input
          type="text"
          name="price"
          onChange={this.handleChange}
          placeholder="Price"
        />
      </h1>
      <h1>
        Image:
        <input
          type="text"
          name="image_url"
          onChange={this.handleChange}
          placeholder="image"
        />
      </h1>
     
        <button onClick={() => this.addProduct()}>Add to inventory</button>
        
       
      </Main>
    );
  }
}

export default Product;

const Img = styled.img`
  background: grey;
  height: 45vh;
  width: 50vw;
  border: light grey;
  border-radius: 8px;
  align-items: center;
  margin: 80px;
  padding: 30px;
  box-shadow: 10px 8px black;
`;
const Main = styled.div`
text-align:center`

const Image = styled.img`
  height: 10vh;
  width: 10vw;
  box-shadow: 8px 8px black;
  align-items: center;
  margin: 80px;
  position: absolute;
  left: 40vw;
`;
