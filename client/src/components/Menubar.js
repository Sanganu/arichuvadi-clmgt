import React from 'react';
import { Link } from 'react-router-dom';

export const Menubar = () => {
   return(
        <nav className = 'icon-bar navbar-collapse'>
            <ul className ="list-unstyled list-group">
                <li  className = "list-group-item">
                <Link to  = '/' className  = 'sidemenulink'><i className="fa fa-home fa-2x"></i><p>Home</p></Link></li>
                <li  className = "list-group-item">
                <Link to  = '/ourteam' className  = 'sidemenulink'><i className="fa fa-user-friends fa-2x"></i><p>Our Team</p></Link></li>
                <li  className = "list-group-item">
                <Link to  = '/alumni' className  = 'sidemenulink'><i className="fa fa-user-graduate fa-2x"></i><p>Alumni</p></Link></li>
                <li   className = "list-group-item">
                <a href='http://www.tamilvu.org/' className  = 'sidemenulink' target ="_blank" rel="noopener noreferrer">
                <i className ="fa fa-university fa-2x"></i><p>Tamil University</p></a></li>
                <li className = "list-group-item" >
                <a href = 'https://commons.wikimedia.org/wiki/Category:Animated_GIF_of_Tamil_letters' className  = 'sidemenulink' target ="_blank" rel="noopener noreferrer">
                <i className="fas fa-asterisk"></i><p>Tamil Aplhabets</p></a></li>
                
                
               

            </ul>     
  </nav>)    
} 


                // <li className = "list-group-item" >
                // <a href='http://wwwlinkedin.com/' className  = 'sidemenulink' target ="_blank" rel="noopener noreferrer">
                // <i className ="fab fa-linkedin fa-2x"></i></a></li>
                // <li className = "list-group-item" >
                // <a href = 'https://www.facebook.com/'  className  = 'sidemenulink' target ="_blank" rel="noopener noreferrer" > */}
                // <i className="fab fa-facebook-square fa-2x"></i></a></li> 
                // <li><a href = 'https://twitter.com/' className  = 'sidemenulink' target ="_blank" rel="noopener noreferrer">
                // <i className ="fab fa-twitter-square fa-2x"></i></a></li> 
                // <li className = "list-group-item" >
                // <a href="https://www.youtube.com/"  target ="_blank" rel="noopener noreferrer" >
                // <i className ="fab fa-youtube-square fa-2x"></i></a></li> 
                // <li className = "list-group-item" >
                // <a href='http://wwwlinkedin.com/' className  = 'sidemenulink' target ="_blank" rel="noopener noreferrer">
                // <i className ="fab fa-linkedin fa-2x"></i></a></li> 