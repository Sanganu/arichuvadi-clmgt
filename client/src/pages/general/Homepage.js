import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Header from '../components/Header';
// import { Menubar } from '../components/Menubar';
import Ourteam from "./Ourteam";
import { connect } from 'react-redux';
import { loginCredentials } from '../../reduxAction/dispatchLoginCredentials';
import { Accordion, Card, Container , Row, Col} from "react-bootstrap";
import "./Homepage.css";

class Homepage extends Component {

    render() {
        const msg = this.props.msg || ""
        return (<Container className="middlecontent">
            <Row>
                <Col xs={12} lg={true}>
                  <Ourteam />
                </Col>
                <Col xs={12} lg={true} >
                    <h4>{msg}</h4>
                    <Accordion>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle variant="link" eventKey="0" className="accordium" >
                                   Login
                        </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <div className="card-body box">
                                        <Link to="/board/login" className="mainlink">Board Member</Link><br />
                                    </div>


                                    <div className="card-body box">
                                        <Link to="/student/loginpg" className="mainlink">Student</Link><br />
                                    </div>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle variant="link" eventKey="1" className="accordium" >
                                    Registration
                        </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>  <div className="card-body box">
                                    <Link to="/student/newstudent" className="mainlink">New Student Registration</Link><br />
                                </div>
                                    <div className="card-body box">
                                        <Link to="/board/addBoard" className="mainlink">Register as Teacher</Link>
                                    </div>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle variant="link" eventKey="2" className="accordium" >
                                 Resources
    
                        </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="2">
                                <Card.Body>
                                    
                                    <div className="card-body box">
                                        <a href="http://www.tamilvu.org/" target="_blank" rel="noopener noreferrer" className="mainlink">Tamil Virtual Academy</a>
                                    </div>
                                    <li   className = "list-group-item">
              
                                    <div className="card-body box">
                                        <Link to="/resources" className="mainlink">Resources</Link>
                                    </div>
                                    </li>

                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                    
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

