import React from 'react';
import { Link } from 'react-router-dom';

export const Menubar = () => {
   return(
<nav className = 'icon-bar'>
         <Link to = '/' className = "sidemenulink"><i class="fa fa-facebook-square"></i></Link>
         <Link to = '/other/students/loginpg' className = "sidemenulink"><i class="fa fa-instagram"></i></Link>
         <Link to = '/teacher/tmain' className = "sidemenulink"><i class="fa fa-twitter-square"></i></Link>
         <Link to="/other/users" className="sidemenulink"><i class="fa fa-youtube-square"></i></Link>
         <a href='http://www.tamilvu.org/' target ="_blank" className = "sidemenulink"><i class="fa fa-university"></i></a>
  </nav>)   
}