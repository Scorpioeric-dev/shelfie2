import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

class Form extends Component {
  state = {
    name: "",
    price: "",
    image_url: "",
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
      // console.log(res)
      this.setState({
        products: res.data
       
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
      prevState
       !== this.state
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
    this.toggleEdit()
  };
  //this allows me to create a new object
  // addProduct = () => {
  //   const { name, price, image_url } = this.state;
  //   axios.post(`/api/products`, { name, price, image_url }).then(res => {
  //     this.setState({ products: res.data });
  //     console.log(res.data);
  //   });
  // };
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
    axios.delete(`/api/product/${id}`).then(res => {
      this.setState({ products: res.data });
    });
    // console.log(this.state.id);
  };

  render() {
    // console.log(this.state);

    let { products } = this.state;
    // console.log(products);
    let newProducts = products.map(data => {
      return (
        <div className="body" key={data.product_id} data={data}>
          {!this.state.editing ? (
            <div>
              <h1 onClick={this.toggleEdit}>Name: {data.name}</h1>
              <h2>Price: {data.price}</h2>
              <Img src={data.image_url} alt="" />
              <Button onClick={() => this.removeData(data.product_id)}>
                delete
              </Button>
            </div>
          ) : (
            <div>
              <input
                type="text"
                name="name"
                onChange={this.handleChange}
                placeholder="Product Name"
                defaultValue={data.name}
              />
              <input
                type="text"
                name="price"
                onChange={this.handleChange}
                placeholder="Price"
                defaultValue={data.price}
              />
              <input
                type="text"
                name="image_url"
                onChange={this.handleChange}
                placeholder="image"
                defaultValue={data.image_url}
              />
              <button onClick={() => this.updateProduct(data.product_id)}>
                Save Changes
              </button>
              <button onClick={this.resetProduct}>Cancel</button>
              <h1>Name: {data.name}</h1>
              <h2>Price: {data.price}</h2>
              <Img src={data.image_url} alt="" />
              <Button onClick={() => this.removeData(data.product_id)}>
                delete
              </Button>
            </div>
          )}
        </div>
      );
    });
    return (
      <div>
        <div>
          {newProducts}

          <Link to="/Product">
            <button onClick={this.addProduct}>Add to inventory</button>
          </Link>
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
  flex-direction: column;
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
  margin: 50px;
  padding: 30px;
  box-shadow: 10px 8px black;
`;
const Button = styled.div`
  border: 2px solid black;
  border-radius: 7px;
  padding: 10px;
  background: #3b4cca;
  color: black;
  font-weight: 700;
  font-size: 0.8rem;
  width: 4vw;
  cursor: pointer;
  position: relative;
  left: 30vw;
`;

//will this work for the cancel / or is it gonna delete the entire id?
//cancel must clear all input boxes then reset to empty
