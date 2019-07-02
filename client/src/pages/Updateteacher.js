import React, { Component } from 'react';
import { connect } from "react-redux";

class Updateteacher extends Component{
    
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        }, () => {
            //console.log('The Value in input change', value, name);
        });

    }

    render() {
        return(<div className="myaccount">
            <h1>Profile</h1>
            <h3>{this.props.userlname+", "+this.props.userfname}</h3>
            <h5>this.props.
       </div> )
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

export default connect(mapStateToProps)(Updateteacher);