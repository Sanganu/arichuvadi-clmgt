import  React,{ Component } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';


class Topmenu extends Component {
        render()
        {
            return(<nav className = 'icon-bar'>
                   
                           <Link to = '/teacher/batchmain' className = 'sidemenulink'><i className="fa fa-users fa-2x"></i></Link>
                           <Link to = '/teacher/searchrecords' className = 'sidemenulink'><i className="fa fa-search fa-2x"></i></Link>
                           <Link to = '/teacher/studentmanagement' className  = 'sidemenulink'><i className="fa fa-user fa-2x"></i></Link> 
                           <Link to  = '/' className  = 'sidemenulink'><i className="fa fa-home fa-2x"></i></Link>
                           {/* <Link to = '/teacher/studentmanagement' className  = 'tlink'>Student Details</Link>  */}
                           <Link to = '/teacher/allbatch' className  = 'sidemenulink' ><i className="fa fa-th fa-2x"></i></Link>
            </nav>); //end return
        } //end render
}// end topmenu

export default Topmenu;

     