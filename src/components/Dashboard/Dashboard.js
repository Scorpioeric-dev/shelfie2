import React, { Component } from "react";
import {Link} from 'react-router-dom'

import styled from "styled-components";

class Dashboard extends Component {
  state = {};
  render() {
    return (
      <div>
        <H1>Welcome to Shelfie The site that will blow your mind</H1>
        <Link to="/Product">
          <Img
            src="https://nice-assets.s3-accelerate.amazonaws.com/image_library/874e43ac8864ada967f4b0a4d308bccc/images/small.jpg"
            alt="Create a Product"
          />
        </Link>
      </div>
    );
  }
}

export default Dashboard;

const H1 = styled.div`
  text-align: center;
  font-size: 40px;
  color: gray;
  text-transform: uppercase;
  font-family: cursive;
`;
const Img = styled.img`
  height: 10vh;
  width: 10vw;
  box-shadow: 8px 8px black;
  align-items: center;
  margin: 80px;
  position: absolute;
  left: 40vw;
  
`;
