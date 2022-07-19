import React from "react";

import img from "Images/testimage.png";
// https://stackoverflow.com/questions/59736269/electron-how-to-resolve-css-url-in-prod

class Image extends React.Component {
  render() {
    return (
      <React.Fragment>
        <img src={img} />
        
      </React.Fragment>
    );
  }
}

export default Image;
