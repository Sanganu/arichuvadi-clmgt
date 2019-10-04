import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { Menubar } from '../components/Menubar';
import { connect } from 'react-redux';
import { loginCredentials } from '../reduxAction/dispatchLoginCredentials';

class Homepage extends Component {

    render() {
        const msg = this.props.msg || ""
        return ( <div className="container middlecontent">
                    <h4>{msg}</h4>
                    <div className="card-deck" id="content">
                        <div className="card-body box1">
                            <Link to="/teacher/login" className="mainlink">Board Member</Link><br />
                        </div>
                        {/* <div className="card-body box6">
                            <Link to="/teacher/instructor" className="mainlink">Instructor</Link><br />
                        </div> */}
                        <div className="card-body box2">
                            <Link to="/other/students/loginpg" className="mainlink">Student</Link><br />
                        </div>
                        <div className="card-body box5">
                            <Link to="/other/newstudent" className="mainlink">New Student Registration</Link><br />
                        </div>
                        <div className="card-body box3">
                            <Link to="/users/videos" className="mainlink">Reference Videos</Link>
                        </div>
                        <div className="card-body box4">
                            <a href="http://www.tamilvu.org/" target="_blank" rel="noopener noreferrer" className="mainlink">Tamil Virtual Academy</a>
                        </div>
                        <div className="card-body box5">
                            <Link to="/resources" className="mainlink">Resources</Link>
                        </div>

                    </div>
                </div>
            // </div>
        
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCredetials: (userCred) => {
            dispatch(loginCredentials(userCred))
        }
    }
  }
export default connect(null,mapDispatchToProps)(Homepage);

