import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { Menubar } from '../components/Menubar';

class Homepage extends Component {

    render() {
        return (
            <div className="frontpage">

                <div className="container middlecontent">


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
                            <a href="http://www.tamilvu.org/" target="_blank" rel="noopener noreferrer" className="mainlink">Tamil Virtual Academy</a>
                        </div>
                        <div className="card-body box5">
                            <Link to="/resources" className="mainlink">Resources</Link>
                        </div>
                    </div>
                </div>
            </div>
        
        );
    }
}

export default Homepage;

