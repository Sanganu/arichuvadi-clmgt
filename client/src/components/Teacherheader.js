import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Teacherheader extends Component {
  

  render()
  {
    return(
        <div className = "navbar navbar-default">
         <Link to="/"><h1>Arichuvadi</h1></Link>
         <h6>A volunteer organization focused to spread Tamil language to future generations</h6>
        </div>
    );
  }
}
export default Teacherheader;
