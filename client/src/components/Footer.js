import React, { Component } from 'react';
import { Link } from "react-router-dom";


class Footer extends Component {
  render()
  {
    return(
        <div className = "footer">

         <Link to = '/' className = "flinks">Return to Edutrack</Link>
         <Link to = '/other/students/loginpg' className = "flinks">Student Login</Link>
         <Link to = '/teacher/tmain' className = "flinks">Teacher Login</Link>
          <p className = "myname">&#169; Edu Track by Sangeetha</p>
        </div>
    );
  }
}
export default Footer;
