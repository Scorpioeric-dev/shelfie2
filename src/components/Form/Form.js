import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import { ETIME } from "constants";

class Form extends Component {
  state = {
    name: "",
    price: "",
    image_url: "https://www.stockvault.net/data/2010/10/12/115317/thumb16.jpg",
    products: [],
    id: 0,
    index: 0,
    editing: false
  };

  componentDidMount() {
    this.getProducts();
  }
//This allows me to obtain my db in sql
  getProducts = () => {
    axios.get(`/api/products`).then(res => {
      this.setState({
        products: res.data,
        img: res.data[res.data.length - 1].img
      });
    });
    // console.log(res.data)
  };
  //this toggles my save changes event using a key
  toggleEdit = () => {
    this.setState({ editing: !this.state.editing });
  };
//re-renders the page
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.products.length &&
      prevState.products.length !== this.state.products.length
    ) {
      this.getProducts();
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  //this resets the values inserted to original state
  resetProduct = () => {
    this.setState({ name: "", price: "", image_url: "" });
  };
//this allows me to create a new object
  addProduct = () => {
    const { name, price, image_url } = this.state;
    axios.post(`/api/products`, { name, price, image_url }).then(res => {
      this.setState({ products: res.data });
      console.log(res.data);
    });
  };
  //allows me to edit values that are set // so look into this // only image thus far
  updateProduct = id => {
    const { name, price, image_url } = this.state;

    axios.put(`/api/products/${id}`, { name, price, image_url }).then(res => {
      this.setState({
        products: res.data
      });
      this.toggleEdit();
    });
  };

  removeData = id => {
    axios.delete(`/api/products/${id}`).then(res => {
      this.setState({products:res.data})
    })
    console.log(this.state.id)
  }
  //
  render() {
    console.log(this.state);
    
    let { products } = this.state;
    let newProducts = products.map(data => {
      return (
        <div className="body" key={data.product_id} data={data}>
          <section>
            <h1 onClick={this.toggleEdit}>Name: {data.name}</h1>
            <h2>Price: {data.price}</h2>
            <button onClick={this.removeData}>delete</button>
            <div>
              <Img src={data.image_url} alt="" />
            </div>
          </section>

          {!this.state.editing ? null : (
            <div>
              <input
                type="text"
                name="name"
                onChange={this.handleChange}
                placeholder="Product Name"
              />
              <input
                type="text"
                name="price"
                onChange={this.handleChange}
                placeholder="Price"
              />
              <input
                type="text"
                name="image_url"
                onChange={this.handleChange}
                placeholder="image"
              />
              <button onClick={this.updateProduct(data.id)}>
                Save Changes
              </button>
            </div>
          )}
        </div>
      );
    });
    return (
      <div>
        <div className="button">
          {newProducts}
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
          <button onClick={this.resetProduct}>Cancel</button>
          <button onClick={this.addProduct}>Add to inventory</button>
        </div>
      </div>
    );
  }
}

export default Form;

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  postion: relative;
  top: 20vh;
  bottom: 20vh;
  flex-wrap: wrap;
  padding: 0.2rem;
`;

const InputContainer = styled.div`
  border-radius: 10px;
  box-shadow: 5px 8px grey;
  justify-content: space-between;
  margin: 20px;
  height: 3.5vh;
  outline-width: 0;
`;

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

//will this work for the cancel / or is it gonna delete the entire id?
//cancel must clear all input boxes then reset to empty
