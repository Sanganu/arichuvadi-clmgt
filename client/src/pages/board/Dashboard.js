import React, { Component } from 'react';
import { connect } from 'react-redux';

class  Dashboard  extends Component{
      
   componentDidMount = () => {
        console.log("Props",this.props)
        // API.getBoardMemberAllDetails(user)
        // .then(results => {
        //     console.log(results)
        // })
    }

    render(){
     return(<div>
         <h6>User Dashboard</h6>


         
     </div>)
    }
}

const mapStateToProps = (state) => {
    // console.log("Map State to Props create batch: ",state);
    return {
        loginemail: state.loginemail,
        userfname: state.userfname,
        userlname: state.userlname,
        usertype: state.usertype,
        userid: state.userid
    }

}

export default connect(mapStateToProps)(Dashboard);
