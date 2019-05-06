import  React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";


class Topmenu extends Component {
    logoutapp = () => {
        axios.post("/auth/logout")
        .then((response)=> {
          console.log("Response from logout",response);
          window.location = "/";
        }).catch((error) =>{
           console.log("Error in logging out",error);
           alert("Error in loggin out");
        });
      }

      
        render()
        {
            return(<nav className = 'icon-bar navbar-collapse'>
                        <ul className ="list-unstyled list-group">
                           <li  className = "list-group-item" data-toggle = "tooltip" data-title="New Cohort"><Link to = '/teacher/batchmain' className = 'sidemenulink'><i  className="fa fa-users fa-2x"></i></Link></li>
                           <li className = "list-group-item"><Link to = '/teacher/searchrecords' className = 'sidemenulink' data-toggle ='Search' data-title = "Search"><i  className="fa fa-search fa-2x"></i></Link></li>
                           <li  className = "list-group-item"><Link to = '/teacher/studentmanagement' className  = 'sidemenulink'><i  data-toggle = 'Student Management' data-title = "Student Management"className="fa fa-user fa-2x"></i></Link> </li>
                           <li  className = "list-group-item"><Link to  = '/' className  = 'sidemenulink'><i className="fa fa-home fa-2x"></i></Link></li>
                           {/* <Link to = '/teacher/studentmanagement' className  = 'tlink'>Student Details</Link>  */}
                           <li  className = "list-group-item"><Link to = '/teacher/allbatch' className  = 'sidemenulink' ><i className="fa fa-th fa-2x"></i></Link></li>
                           <li  className = "list-group-item"><Link to = '/teacher/addteacher' className  = 'sidemenulink' ><i className="fa fa-chalkboard-teacher fa-2x"></i></Link></li>
                           <li  className = "list-group-item sidemenulink" onClick={this.logoutapp}><i className="fas fa-sign-out-alt fa-2x"></i></li>
                        </ul>   
            </nav>); //end return
        } //end render
}// end topmenu

export default Topmenu;

                                                                                                                                    