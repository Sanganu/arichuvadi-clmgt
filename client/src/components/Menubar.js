import React from 'react';
import { Link } from 'react-router-dom';

export const Menubar = () => {
   return(<div>
<div className = 'sidenav'>
                   
                   <Link to = '/teacher/batchmain' className = 'mainlink'>Create New Batch</Link>
                   <Link to = '/teacher/searchrecords' className = 'mainlink'>Search</Link>
                    <Link to = '/teacher/studentmanagement' className  = 'mainlink'>Student Details</Link> 
           
    </div>
  </div>)   
}