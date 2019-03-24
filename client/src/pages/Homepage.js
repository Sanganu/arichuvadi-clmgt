import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import {Menubar} from '../components/Menubar';

class Homepage extends Component {
 
    render() {
        return (
            <div className="frontpage">
                <Header />
                <div className="container middlecontent">
                    <div className="row" >
                       <div className = "col-lg-1">
                              <Menubar />
                       </div>
                        <div className="col-lg-6">
                        </div>
                        <div className="col-lg-5">
                            <div className="card-deck" id="content">
                                {/* <div className="card mb-4"> */}
                                <div className="card-body box1">
                                    {/* <h4 className="card-title">Teachers</h4>
                                    <p className="card-text">Easy class management solution for independant teacher.</p> */}
                                    <Link to="/teacher/tmain" className="mainlink">Instructor</Link><br />
                                    
                                </div>
                                {/* </div>
                        <div className="card mb-4 dark-card-title"> */}
                                <div className="card-body box2">
                                    {/* <h4 className="card-title">Students</h4>
                                    <p className="card-text">Check your Attendance , Home work</p> */}
                                    <Link to="/other/students/loginpg" className="mainlink">Student</Link><br />
                                </div>
                                {/* </div>
                        <div className="card mb-4"> */}
                                <div className="card-body box3">
                                    {/* <h4 className="card-title">Visitors</h4>
                                    <p className="card-text">Achievements and Performances</p> */}
                                    <Link to="/other/users" className="mainlink">Reference Videos</Link>
                                </div>
                                <div className="card-body box4">
                                    {/* <h4 className="card-title">Visitors</h4>
                                    <p className="card-text">Achievements and Performances</p> */}
                                    <a href="http://www.tamilvu.org/" target ="_blank"  rel="noopener noreferrer" className="mainlink">Tamil Virtual Academy</a>
                                </div>
                                <div className="card-body box5">
                                    {/* <h4 className="card-title">Visitors</h4>
                                    <p className="card-text">Achievements and Performances</p> */}
                                    <a href="#" target ="_blank" rel="noopener noreferrer" className="mainlink">Books</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Footer /> */}
            </div>
        );
    }
}

export default Homepage;

