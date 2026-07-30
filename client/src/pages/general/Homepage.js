import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginCredentials } from '../../reduxAction/dispatchLoginCredentials';
import { Accordion, Card, Container, Row, Col, Jumbotron } from "react-bootstrap";
import "./Homepage.css";

class Homepage extends Component {

    render() {
        const msg = this.props.msg || ""
        return (<Container className="middlecontent">
            <h4>{msg}</h4>
            <Row>
            <Col>

                <Accordion className="d-flex flex-wrap">

                    <Card>
                        <Card.Header>
                            <Accordion.Toggle variant="link" eventKey="0" className="accordium" >
                                <p className="text-justify">Login</p>
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


                    <Card >
                        <Card.Header>
                            <Accordion.Toggle variant="link" eventKey="1" className="accordium">
                                <p className="text-justify"> Registration</p>
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>

                                <div className="card-body box">
                                    <Link to="/student/newstudent" className="mainlink">New Student Registration</Link><br />
                                </div>
                                {/* <div className="card-body box">
                                    <Link to="/board/addBoard" className="mainlink">Register as Teacher</Link>
                                </div> */}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>


                </Accordion>
                </Col>
                {/* <Card>
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
                        </Card> */}


            </Row>
            <Row>
                <Col>
                    <Jumbotron className="d-flex justify-content-center m-5 p-5 mission text-white">
                        <h4 className="text-center text-wrap">Our Mission</h4>
                        <p className="text-center text-wrap">In our school we aspire to help students learn tamil (through reading and writing) to maintain connections to their mother tongue
                            and strengthen their bond to their heritage by teaching them Tamil in a way that they'll never forget.
                        We tie up with Anna Unviersity, Chennai, India. The Exam dates and number of students are registered, we conduct test
                    and submit test papers, the University grades them and award Certificates</p>
                    </Jumbotron>
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

