 import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Returnpage extends Component {
  render()
  {
       return(
           <Link to ="/teacher/validmain">Teacher Page</Link>
           <Link to = "/">Home</Link>
       );
  }
}
