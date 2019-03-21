import React from 'react';
import { Link } from 'react-router-dom';

export const Menubar = () => {
   return(
<nav className = 'icon-bar'>
         <Link to = '/' className = "sidemenulink"><i class="fa fa-facebook-square"></i></Link>
         <Link to = '/other/students/loginpg' className = "sidemenulink"><i class="fa fa-instagram"></i></Link>
         <Link to = '/teacher/tmain' className = "sidemenulink"><i class="fab fa-twitter-square"></i></Link>
{/*          
                   <Link to = '/teacher/batchmain' className = 'sidemenulink'><i class="fa fa-plus-square"></i></Link>
                   <Link to = '/teacher/searchrecords' className = 'sidemenulink'><i class="fa fa-search"></i></Link>
                    <Link to = '/teacher/studentmanagement' className  = 'sidemenulink'><i class="fa fa-users"></i></Link> 
            */}

  </nav>)   
}