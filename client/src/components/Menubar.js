import React from 'react';
import { Link } from 'react-router-dom';

export const Menubar = () => {
   return(
        <nav className = 'icon-bar navbar-collapse'>
            <ul className ="list-unstyled list-group">
            <li  className = "list-group-item"><Link to  = '/' className  = 'sidemenulink'><i className="fa fa-home fa-2x"></i></Link></li>
                <li><a href='http://www.tamilvu.org/' target ="_blank" rel="noopener noreferrer" className = "list-group-item">
                <i className ="fa fa-university fa-2x"></i></a></li>
                <li><a href = 'https://www.facebook.com/' className = "list-group-item" target ="_blank" rel="noopener noreferrer" >
                <i className="fab fa-facebook-square fa-2x"></i></a></li>
                <li><a href="https://www.youtube.com/" className= "list-group-item" target ="_blank" rel="noopener noreferrer" >
                <i className ="fab fa-youtube-square fa-2x"></i></a></li>
                <li><a href='http://wwwlinkedin.com/' target ="_blank" rel="noopener noreferrer" className = "list-group-item">
                <i className ="fab fa-linkedin fa-2x"></i></a></li>
                <li><a href = 'https://commons.wikimedia.org/wiki/Category:Animated_GIF_of_Tamil_letters' target ="_blank" rel="noopener noreferrer" className = "list-group-item"><i className="fas fa-asterisk"></i></a></li>
                <li><a href = 'https://twitter.com/' target ="_blank" rel="noopener noreferrer"  className = "list-group-item">
                <i className ="fab fa-twitter-square fa-2x"></i></a></li>
            </ul>     
  </nav>)   
} 