import  React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { connect } from 'react-redux';

class Topmenu extends Component {
    logoutapp = () => {
        axios.post("/auth/logout")
        .then((response)=> {
          console.log("Response from logout",response);
          window.location = "/";
        }).catch((error) =>{
           console.log("Error in logging out",error);
           alert("Error in logging out");
        });
      }

      
        render()
        {
            return(<nav className = 'icon-bar'>
                        <ul className ="list-unstyled list-group">
                             <li  className = "list-group-item"><Link to  = '/' className  = 'sidemenulink'><i className="fa fa-home fa-2x"></i><p>Home Page</p></Link></li>
                             {/* <li  className = "list-group-item"><Link to = '/teacher/allteacher' className  = 'sidemenulink' ><i className="fa fa-chalkboard-teacher fa-2x"></i><p>Teacher Management</p></Link></li> */}
                             <li  className = "list-group-item"><Link to = '/student/studentmanagement' className  = 'sidemenulink'><i  data-toggle = 'Student Management' data-title = "Student Management"className="fa fa-users fa-2x"></i><p>Student Management</p></Link></li>
                              
                              <li  className = "list-group-item"><Link to = '/board/allbatch/alltrue' className  = 'sidemenulink' ><i className="fa fa-th fa-2x"></i><p>Cohort Management</p></Link></li>
                         
                              <li  className = "list-group-item"><Link to = '/teacher/batch/addclass' className  = 'sidemenulink' ><i className="fa fa-book fa-2x"></i><p>Class Activities</p></Link></li>
                         
                              <li  className = "list-group-item"><Link to = '/board/createbatch' className = 'sidemenulink'><i  className="fa fa-user-circle fa-2x"></i><p className="linkinwords">New Batch</p></Link></li>
                              <li className = "list-group-item"><Link to = '/board/searchrecords' className = 'sidemenulink' data-toggle ='Search' data-title = "Search"><i  className="fa fa-search fa-2x"></i><p className ="linkinwords">Search</p></Link></li>
                              {/* <li className = "list-group-item"><Link to = '/teacher/addBoard' className = 'sidemenulink' data-toggle ='Search' data-title = "Search"><i  className="fa fa-search fa-2x"></i><p className ="linkinwords">Add Board Member</p></Link></li>  */}
                              {/* <li className ="list-group-item"><Link to = '/teacher/profile/update' className = 'sidemenulink'><i className="fas fa-user-shield fa-2x"></i><p>My Account</p></Link></li> */}
                              {/* <Link to = '/teacher/studentmanagement' className  = 'tlink'>Student Details</Link>  */}
                              <li  className = "list-group-item sidemenulink" onClick={this.logoutapp}><i className="fas fa-sign-out-alt fa-2x"></i><p>Logout</p></li>
                              {/* <i class="far fa-user-circle"></i> */}
                        </ul>   
            </nav>); //end return
        } //end render
}// end topmenu

const mapStateToProps = (state) => {
  console.log("Map State to Props : ",state);
  return {
    loginemail:state.loginemail,
    userfname:state.fname,
    userlname:state.userlname,
    usertype:state.usertype,
    userid:state.userid
  }
  
}
export default connect(mapStateToProps)(Topmenu);

                                                                                                                                    