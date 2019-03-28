import  React,{ Component } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';


class Topmenu extends Component {
        render()
        {
            return(<nav className = 'icon-bar'>
                        <ul className ="list-unstyled list-group">
                           <li  className = "list-group-item"><Link to = '/teacher/batchmain' className = 'sidemenulink'><i className="fa fa-users fa-2x"></i></Link></li>
                           <li className = "list-group-item"><Link to = '/teacher/searchrecords' className = 'sidemenulink'><i className="fa fa-search fa-2x"></i></Link></li>
                           <li  className = "list-group-item"><Link to = '/teacher/studentmanagement' className  = 'sidemenulink'><i className="fa fa-user fa-2x"></i></Link> </li>
                           <li  className = "list-group-item"><Link to  = '/' className  = 'sidemenulink'><i className="fa fa-home fa-2x"></i></Link></li>
                           {/* <Link to = '/teacher/studentmanagement' className  = 'tlink'>Student Details</Link>  */}
                           <li  className = "list-group-item"><Link to = '/teacher/allbatch' className  = 'sidemenulink' ><i className="fa fa-th fa-2x"></i></Link></li>
                           <li  className = "list-group-item"><Link to = '/teacher/addteacher' className  = 'sidemenulink' ><i className="fa fa-chalkboard-teacher fa-2x"></i></Link></li>
                        </ul>   
            </nav>); //end return
        } //end render
}// end topmenu

export default Topmenu;

                                                                                                                                    