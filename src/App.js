import React, { Component } from "react";

import routes from "./routes";
import { Link } from "react-router-dom";
import styled from "styled-components";

import "./App.css";

class App extends Component {
  state = {
    name: "",
    price: "",
    img: "",
    products: []
  };
  render() {
    return (
      <Div >
        {routes}
       
      
      </Div>
    );
  }
}

export default App;

const Img = styled.img`
  height: 10vh;
  width: 10vw;
  box-shadow: 8px 8px black;
  align-items: center;
  margin: 80px;
  position: absolute;
  left: 40vw;
  
`;
const Div = styled.div`
display:flex;
flex-direction:column;

object-fit:contain;
`
