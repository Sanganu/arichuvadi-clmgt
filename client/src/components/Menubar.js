import React from 'react';
import { Link } from 'react-router-dom';

export const Menubar = () => {
   return(<div>
<div className = 'sidenav'>
                   
                   <Link to = '/teacher/batchmain' className = 'mainlink'><i class="fa fa-plus-square"></i></Link>
                   <Link to = '/teacher/searchrecords' className = 'mainlink'><i class="fa fa-search"></i></Link>
                    <Link to = '/teacher/studentmanagement' className  = 'mainlink'><i class="fa fa-users"></i></Link> 
           
    </div>
  </div>)   
}