import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Header from '../components/Header';
// import { Menubar } from '../components/Menubar';
import Ourteam from "./Ourteam";
import { connect } from 'react-redux';
import { loginCredentials } from '../../reduxAction/dispatchLoginCredentials';
import { Accordion, Card, Button, Container , Row, Col} from "react-bootstrap";

class Homepage extends Component {

    render() {
        const msg = this.props.msg || ""
        return (<Container className="middlecontent">
            <Row>
                <Col xs lg={6}>
                  <Ourteam />
                </Col>
                <Col>
                    <h4>{msg}</h4>
                    <Accordion>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle variant="link" eventKey="0">
                                    Sign Up
                        </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <div className="card-body box1">
                                        <Link to="/board/login" className="mainlink">Board Member</Link><br />
                                    </div>


                                    <div className="card-body box2">
                                        <Link to="/student/loginpg" className="mainlink">Student</Link><br />
                                    </div>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle variant="link" eventKey="1">
                                    Registration
                        </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>  <div className="card-body box5">
                                    <Link to="/student/newstudent" className="mainlink">New Student Registration</Link><br />
                                </div>
                                    <div className="card-body box5">
                                        <Link to="/board/addBoard" className="mainlink">Register as Board Member / Teacher</Link>
                                    </div>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle variant="link" eventKey="0">
                                    External Links
    
                        </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <div className="card-body box3">
                                        <Link to="/users/videos" className="mainlink">Reference Videos</Link>
                                    </div>
                                    <div className="card-body box4">
                                        <a href="http://www.tamilvu.org/" target="_blank" rel="noopener noreferrer" className="mainlink">Tamil Virtual Academy</a>
                                    </div>
                                    <div className="card-body box5">
                                        <Link to="/resources" className="mainlink">Resources</Link>
                                    </div>


                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                    <div className="card-deck" id="content">

                        {/* <div className="card-body box6">
                            <Link to="/teacher/instructor" className="mainlink">Instructor</Link><br />
                        </div> */}



                    </div>
                </Col>
            </Row>
        </Container>
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
export default connect(null, mapDispatchToProps)(Homepage);

