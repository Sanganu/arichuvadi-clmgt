import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Homepage extends Component {

    render() {
        return (
            <div className="frontpage">
                <Header />
                <div className="container">
                    <div className="row" >
                        <div className="col-lg-8">
                        </div>
                        <div className="col-lg-4">
                            <div className="card-deck" id="content">
                                {/* <div className="card mb-4"> */}
                                <div className="card-body box1">
                                    {/* <h4 className="card-title">Teachers</h4>
                                    <p className="card-text">Easy class management solution for independant teacher.</p> */}
                                    <Link to="/teacher/tmain" className="mainlink">Teachers login</Link><br />

                                </div>
                                {/* </div>
                        <div className="card mb-4 dark-card-title"> */}
                                <div className="card-body box2">
                                    {/* <h4 className="card-title">Students</h4>
                                    <p className="card-text">Check your Attendance , Home work</p> */}
                                    <Link to="/other/students/loginpg" className="mainlink">Student Login</Link><br />
                                </div>
                                {/* </div>
                        <div className="card mb-4"> */}
                                <div className="card-body box3">
                                    {/* <h4 className="card-title">Visitors</h4>
                                    <p className="card-text">Achievements and Performances</p> */}
                                    <Link to="/other/users" className="mainlink">Reference</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Homepage;

