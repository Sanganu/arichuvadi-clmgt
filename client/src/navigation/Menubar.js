import React from 'react';
import { Link } from 'react-router-dom';

export const Menubar = () => {
   return(
        <nav className = 'icon-bar navbar-collapse'>
            <ul className ="list-unstyled list-group">
                <li  className = "list-group-item">
                <Link to  = '/' className  = 'sidemenulink text-wrap'><i className="fa fa-home fa-2x"></i><p>Home</p></Link></li>
                <li  className = "list-group-item text-wrap">
                <Link to  = '/ourteam' className  = 'sidemenulink'><i className="fa fa-user-friends fa-2x"></i><p>Our Team</p></Link></li>
                <li  className = "list-group-item">
                <Link to  = '/alumni' className  = 'sidemenulink'><i className="fa fa-user-graduate fa-2x"></i><p>Alumni</p></Link></li>
           
            </ul>     
  </nav>)    
} 

export const Midmenu = () => {
    return(
         <nav className = 'icon-bar navbar-collapse'>
             <ul className ="list-unstyled list-group">
                 <li  className = "list-group-item">
                 <Link to  = '/' className  = 'sidemenulink'><i className="fa fa-home fa-2x"></i><p>Home</p></Link></li>
                 <li  className = "list-group-item">
                 <Link to  = '/ourteam' className  = 'sidemenulink'><i className="fa fa-user-friends fa-2x"></i><p>All Batches</p></Link></li>
                 <li  className = "list-group-item">
                 <Link to  = '/alumni' className  = 'sidemenulink'><i className="fa fa-user-graduate fa-2x"></i><p>Alumni</p></Link></li>
                 <li   className = "list-group-item">
                 <Link to  = '/alumni' className  = 'sidemenulink'><i className="fa fa-users fa-2x"></i><p>Student Management</p></Link></li>
             
             </ul>     
   </nav>)    
 } 

