import React from "react";

import img from "Images/testimage.png";

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
