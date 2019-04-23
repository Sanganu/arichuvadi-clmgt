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
                       <div className = "col-lg-1 col-md-1 col-sm-12">
                              <Menubar />
                       </div>
                        <div className="col-lg-11 col-md-11 col-sm-12">
                            <div className="card-deck" id="content">
                                <div className="card-body box1">
                                    <Link to="/teacher/tmain" className="mainlink">Instructor</Link><br />
                                </div>
                                <div className="card-body box2">
                                    <Link to="/other/students/loginpg" className="mainlink">Student</Link><br />
                                </div>
                                <div className="card-body box3">
                                    <Link to="/users/videos" className="mainlink">Reference Videos</Link>
                                </div>
                                <div className="card-body box4">
                                    <a href="http://www.tamilvu.org/" target ="_blank"  rel="noopener noreferrer" className="mainlink">Tamil Virtual Academy</a>
                                </div>
                                <div className="card-body box5">
                                    <Link to="/resources"  className="mainlink">Resources</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
          </div>
        );
    }
}

export default Homepage;

