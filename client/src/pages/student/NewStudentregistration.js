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
        parentphonenumber_2:"",
        password: "",
        grade_completed: "",
        course_completed:"",
        grade_enrolled:"",
        course_enrolled:"", 
        errmsg: ''
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
    setName = (firstname, lastname) => {
        this.setState({
            studentfname: firstname,
            studentlname: lastname
        })
    }
    setParentName = (firstname, lastname) => {
        this.setState({ parentname: firstname + " " + lastname })
    }

    setParentName = (field, value) => {
        this.setState({
            [field]: value
        })
    }
    handleStudentCreation = (event) => {
        event.preventDefault();
        // console.log("In Student Creation", this.state);
        if (this.state.studentfname === "" ||
            this.state.studentlname === "" ||
            this.state.loginemail === "" ||
            this.state.parentname_1 === "" ||
            this.state.grade_completed === "" ||
            this.state.course_enrolled === "" ||
            this.state.parentphonenumber_1 === "" ||
            this.state.password === "") {
            // console.log("Empty fields not accepted", this.state.studentfname.this.state.studentlname, this.state.loginemail, this.state.parentname, this.state.parentphonenumber, this.state.password);
            this.setState({ errmsg: " Enter valid data in the required fields " })
        }
        else {
            if (this.state.password === this.state.password1) {
                console.log('Pass')

                let newstudent = {
                    studentfname: this.state.studentfname,
                    studentlname: this.state.studentlname,
                    parentname_1: this.state.parentname,
                    parentname_2:this.state.parentname,
                    loginemail: this.state.loginemail,
                    password: this.state.password,
                    parentphonenumber_1: this.state.parentphonenumber_1,
                    parentphonenumber_2 : this.state.parentphonenumber_2,
                    grade_completed: this.state.grade_completed,
                    course_completed: this.state.course_completed,
                    grade_enrolled: this.state.grade_enrolled,
                    grade_completed:this.state.grade_completed
                }
                API.createNewStudent(newstudent)
                    .then(res => {
                        console.log("The response from adding student", res);

                        this.setState({
                            studentfname: '',
                            studentlname: '',
                            parentname_1: '',
                            parentname_2:'',
                            loginemail: '',
                            parentphonenumber: '',
                            completedcourse: '',
                            completedlevel: '',
                            password: "",
                            errmsg: "Student details registered, A Board member will review your details and contact as soon as possible"
                        },()=>{
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
            <div>

                <h3 className="subhead">New Student Registration</h3>
                {this.state.errmsg}
                <Container>
                    {/* <form className="inputsection"> */}
                    <Form>
                        <Row>
                            <Col>
                                <Name
                                    fname={this.state.studentfname}
                                    lname={this.state.studentlname}
                                    setName={this.setName} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Name
                                    fname={this.state.parentfname}
                                    lname={this.state.parentlname}
                                    setName={this.setParentName} />
                            </Col>
                        </Row>
                        <Row>
                            <Email
                                email={this.state.email}
                                setEmail={this.setEmail} />
                        </Row>
                        <Row>
                            <label className="has-float-label">Password</label>
                            <input type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} name="password" />

                            <div className="form-group row">
                                <label className="has-float-label">ReType Password</label>
                                <input type="password" className="form-control" placeholder="Retype Password" value={this.state.password1} onChange={this.handleInputChange} name="password1" />
                            </div>
                        </Row>
                        <div className="form-group row">
                            <label className="has-float-label">Phone Number</label>
                            <input type="text" className="form-control" placeholder="Phone number" value={this.state.parentphonenumber} onChange={this.handleInputChange} name="parentphonenumber" />
                        </div>
                        <Row>
                             <Col>
                        <Form.Group>
                            <Form.Label>Completed Course : </Form.Label>
                            <select className="form-control droplist"
                                onChange={this.handleInputChange}
                                value={this.state.completedcourse} name="completedcourse" >
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
                            <select className="form-control droplist" value={this.state.completedlevel} onChange={this.handleInputChange} name="completedlevel" >
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
                                value={this.state.completedcourse} name="requestcourse" >
                                <option value='Beginner'>Beginner</option>
                                <option value='Intermediate'>Intermediate</option>
                                <option value='Advance'>Advance</option>
                            </select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="has-float-label">Requesting Level : </Form.Label>
                            <select className="form-control droplist" value={this.state.requestlevel} onChange={this.handleInputChange} name="requestlevel" >
                                <option value='Oral'>Oral Examination</option>
                                <option value='Visual'>Visual Examination</option>
                                <option value='Written'>Written Examination</option>
                                <option value='Online'>Online Examination</option>
                                <option value='Offline'>Offline Examination</option>
                            </select>
                        </Form.Group>


                        <button className="createbutton" name="clcreation" onClick={this.handleStudentCreation}>Create Student account</button>
                        {/* <p>Please consider donating at least $10 per level to cover the basic cost.</p> */}
                    </Form>
                </Container >
                <br />


            </div >
        ) //end return
    } // end render

} // end class

export default Studentregistration;
