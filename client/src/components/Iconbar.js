import React,{ Component } from 'react';
import { connect } from "react-redux";
import Topmenu from "./Topmenu";
import { Menubar , Midmenu } from "./Menubar";

class Iconbar extends Component{
   render(){
     console.log("Values from redux",this.props);
         if (this.props.usertype === "management")
          {
                console.log("Role:",this.props.usertype)
                return <Topmenu />
            }
          else if(this.props.usertype === "instructor")
          {
                return <Midmenu />
          }
          else
          {   console.log("Role:",this.props.usertype);
               return <Menubar /> 
          }
   }
}

const mapStateToProps = (state) => { 
    console.log("Map State to Props : ",state);
    return {
      loginemail:state.loginemail,
      userfname:state.userfname,
      userlname:state.userlname,
      usertype:state.usertype,
      userid:state.userid
    }
    
  }

export default connect(mapStateToProps)(Iconbar);
