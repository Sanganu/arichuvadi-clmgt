import React from 'react';
import { Link } from 'react-router-dom';

export const Menubar = () => {
   return(
<nav className = 'icon-bar'>
         <Link to = '/' className = "list-group-item"><i class="fa fa-facebook-square fa-2x"></i></Link>
         <Link to = '/other/students/loginpg' className = "list-group-item"><i class="fa fa-instagram fa-2x"></i></Link>
         <Link to = '/teacher/tmain' className = "list-group-item"><i class="fa fa-twitter-square fa-2x"></i></Link>
         <Link to="/other/users" className= "list-group-item"><i class="fa fa-youtube-square fa-2x"></i></Link>
         <a href='http://www.tamilvu.org/' target ="_blank" rel="noopener noreferrer" className = "list-group-item"><i class="fa fa-university fa-2x"></i></a>
         <a href='http://wwwlinkedin.com/' target ="_blank" rel="noopener noreferrer" className = "list-group-item"><i class="fa fa-university fa-2x"></i></a>
  </nav>)   
}