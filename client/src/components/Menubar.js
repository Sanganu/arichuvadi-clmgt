import React from 'react';
import { Link } from 'react-router-dom';

export const Menubar = () => {
   return(
<nav className = 'icon-bar'>
    <ul>
         <Link to = '/' className = "list-group-item"><i className="fab fa-facebook-square fa-2x"></i></Link>
         <Link to = '/other/students/loginpg' className = "list-group-item"><i className="fab fa-instagram fa-2x"></i></Link>
         <Link to = '/teacher/tmain' className = "list-group-item"><i className ="fab fa-twitter-square fa-2x"></i></Link>
         <Link to="/other/users" className= "list-group-item"><i className ="fab fa-youtube-square fa-2x"></i></Link>
         <a href='http://www.tamilvu.org/' target ="_blank" rel="noopener noreferrer" className = "list-group-item">
         <i className ="fa fa-university fa-2x"></i></a>
         <a href='http://wwwlinkedin.com/' target ="_blank" rel="noopener noreferrer" className = "list-group-item">
         <i className ="fab fa-linkedin fa-2x"></i></a>
    </ul>     
  </nav>)   
} 