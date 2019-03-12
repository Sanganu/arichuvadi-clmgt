import React, { Component } from 'react';
import { Link } from "react-router-dom";


class Footer extends Component {
  render()
  {
    return(
        <div className = "footer">

         <Link to = '/' className = "flinks"><i class="fa fa-facebook-square"></i></Link>
         <Link to = '/other/students/loginpg' className = "flinks"><i class="fa fa-instagram"></i></Link>
         <Link to = '/teacher/tmain' className = "flinks"><i class="fab fa-twitter-square"></i></Link>
          <p className = "myname">&#169; Edu Track by Sangeetha</p>
        </div>
    );
  }
}
export default Footer;
