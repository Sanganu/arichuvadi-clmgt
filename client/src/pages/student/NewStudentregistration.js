import React, { Component } from 'react';
import API from "../../API/Student"
import Email from "../../components/Email";
// import Password from "../../components/Password";
import Name from "../../components/MemberName";
import { Row, Col, Container, Form } from "react-bootstrap";

class Studentregistration extends Component {
    state = {
        studentfname: "",
        studentlname: "",
        loginemail: "",
        parentname_1: "",
        parentname_2: "",
        parentphonenumber_1: "",
        parentphonenumber_2: "",
        password: "",
        password1:"",
        grade_completed: "",
        course_completed: "",
        grade_enrolled: "",
        course_enrolled: "",
        errmsg: '',
    }
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.name : target.value;
        const name = target.type === 'checkbox' ? 'daysofweek' : target.name;
        //console.log('The Value in input change',value,name);

        this.setState({
            [name]: value
        });
    } // end od handleInputChange

    //Handle email
    setEmail = (email) => {
        this.setState({ loginemail: email })
    }

    setPassword = (password) => {
        this.setState({ password })
    }
    setFirstName = (name) => {
        this.setState({
            studentfname: name
        })
    }
    setSecondName = (name) => {
        this.setState({
            studentlname: name
        })
    }
    setFirstParentName = (name) => {
        this.setState({
            parentname_1: name
        })
    }

    setSecondParentName = (name) => {
        this.setState({
            parentname_2: name
        })
    }

    handleStudentCreation = (event) => {
        event.preventDefault();
        //console.log("In Student Creation", this.state);
        if (this.state.studentfname === "" ||
            this.state.studentlname === "" ||
            this.state.loginemail === "" ||
            this.state.parentname_1 === "" ||
            this.state.grade_completed === "" ||
            this.state.course_enrolled === "" ||
            this.state.parentphonenumber_1 === "" ||
            this.state.password === "") {
            this.setState({ errmsg: " Enter valid data in the required fields " })
        }
        else {
            if (this.state.password === this.state.password1) {
                let newstudent = {
                    studentfname: this.state.studentfname,
                    studentlname: this.state.studentlname,
                    parentname_1: this.state.parentname,
                    parentname_2: this.state.parentname,
                    loginemail: this.state.loginemail,
                    password: this.state.password,
                    parentphonenumber_1: this.state.parentphonenumber_1,
                    parentphonenumber_2: this.state.parentphonenumber_2,
                    grade_completed: this.state.grade_completed,
                    course_completed: this.state.course_completed,
                    grade_enrolled: this.state.grade_enrolled
                }

                console.log("NEW STUDENT",newstudent)
                API.createNewStudent(newstudent)
                    .then(res => {
                        console.log("The response from adding student", res);

                        this.setState({
                            studentfname: '',
                            studentlname: '',
                            parentname_1: '',
                            parentname_2: '',
                            loginemail: '',
                            parentphonenumber_1: '',
                            parentphonenumber_2: '',
                            course_completed: '',
                            grade_completed: '',
                            grade_enrolled:'',
                            course_enrolled:'',
                            password: "",
                            password1:'',
                            errmsg: "Student details registered, A Board member will review your details and contact as soon as possible"
                        }, () => {
                            console.log("Student Created")
                            // return <Homepage msg="You may login" />
                        })
                    })
                    .catch(error => {
                        this.setState({ errmsg: "Student Email already exist" });
                        console.log("Error!!!!", error)
                    }); // End of axios
            } else {
                this.setState({ errmsg: "Password and Re-Type password doesn't match" });
            }
        } //end if
    }; // end of handleStudentCreation

    render() {
        return (
            <>
                <h3 className="subhead">New Student Registration</h3>
                {this.state.errmsg}
                <Container>
                    <Form>
                        <Row>
                            <Col>
                                <Name
                                    field1_name={this.state.studentfname}
                                    field_1="First Name"
                                    field_2="Last Name"
                                    field2_name={this.state.studentlname}
                                    setFirstField={this.setFirstName}
                                    setSecondField={this.setSecondName}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Name
                                    field1_name={this.state.parentname_1}
                                    field_1="First Parent Name"
                                    field_2="Second Parent Name"
                                    field2_name={this.state.parentname_2}
                                    setFirstField={this.setFirstParentName} setSecondField={this.setSecondParentName}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Email
                                    email={this.state.loginemail}
                                    setEmail={this.setEmail} />
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label className="has-float-label">Password</Form.Label>
                                    <Form.Control type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} name="password" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className="has-float-label">ReType Password</Form.Label>
                                    <Form.Control type="password" className="form-control" placeholder="Retype Password" value={this.state.password1} onChange={this.handleInputChange} name="password1" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label className="has-float-label">Parent Phone Number(1)</Form.Label>
                                    <Form.Control type="text" className="form-control" placeholder="Phone number" value={this.state.parentphonenumber_1} onChange={this.handleInputChange} name="parentphonenumber_1" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label className="has-float-label">Parent Phone Number(2)</Form.Label>
                                    <Form.Control type="text" className="form-control" placeholder="Phone number" value={this.state.parentphonenumber_2} onChange={this.handleInputChange} name="parentphonenumber_2" />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Completed Course : </Form.Label>
                                    <select className="form-control droplist"
                                        onChange={this.handleInputChange}
                                        value={this.state.course_completed} name="course_completed" >
                                        <option value='None' default>None</option>
                                        <option value='Beginner'>Beginner</option>
                                        <option value='Intermediate'>Intermediate</option>
                                        <option value='Advance'>Advance</option>
                                    </select>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Completed Level : </Form.Label>
                                    <select className="form-control droplist" value={this.state.grade_completed} onChange={this.handleInputChange} name="grade_completed" >
                                        <option value='None' default>None</option>
                                        <option value='Oral'>Oral Examination</option>
                                        <option value='Visual'>Visual Examination</option>
                                        <option value='Written'>Written Examination</option>
                                        <option value='Online'>Online Examination</option>
                                        <option value='Offline'>Offline Examination</option>
                                    </select>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group>
                            <Form.Label>Requesting Course : </Form.Label>
                            <select className="form-control droplist"
                                onChange={this.handleInputChange}
                                value={this.state.course_enrolled} name="course_enrolled" >
                                <option value='Beginner'>Beginner</option>
                                <option value='Intermediate'>Intermediate</option>
                                <option value='Advance'>Advance</option>
                            </select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="has-float-label">Requesting Level : </Form.Label>
                            <select className="form-control droplist" value={this.state.grade_enrolled} onChange={this.handleInputChange} name="grade_enrolled" >
                                <option value='Oral'>Oral Examination</option>
                                <option value='Visual'>Visual Examination</option>
                                <option value='Written'>Written Examination</option>
                                <option value='Online'>Online Examination</option>
                                <option value='Offline'>Offline Examination</option>
                            </select>
                        </Form.Group>
                        <button className="createbutton" name="clcreation" onClick={this.handleStudentCreation}>Create Student account</button>
                    </Form>
                </Container >
                <br />
            </>
        ) //end return
    } // end render

} // end class

export default Studentregistration;
