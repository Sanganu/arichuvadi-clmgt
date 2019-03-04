import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Teacherheader extends Component {
  render()
  {
    return(
        <div className = "navbar navbar-default">
         <Link to="/"><h1>Academy of Music & Dance</h1></Link>
         <h6>Music & Dance are all you need</h6>
        </div>
    );
  }
}
export default Teacherheader;
