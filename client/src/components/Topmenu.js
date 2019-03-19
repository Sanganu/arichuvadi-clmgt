import  React,{ Component } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';


class Topmenu extends Component {
        render()
        {
            return(<nav className = 'icon-bar'>
                   
                           <Link to = '/teacher/batchmain' className = 'sidemenulink'><i class="fa fa-users"></i></Link>
                           <Link to = '/teacher/searchrecords' className = 'sidemenulink'><i class="fa fa-search"></i></Link>
                           <Link to = '/teacher/studentmanagement' className  = 'sidemenulink'><i class="fa fa-user"></i></Link> 
                           <Link to  = '/' className  = 'sidemenulink'><i class="fa fa-home"></i></Link>
                           {/* <Link to = '/teacher/studentmanagement' className  = 'tlink'>Student Details</Link>  */}
                           <Link to = '/teacher/allbatch' className  = 'sidemenulink' ><i class="fa fa-th"></i></Link>
            </nav>); //end return
        } //end render
}// end topmenu

export default Topmenu;

    