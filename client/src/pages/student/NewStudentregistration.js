import React, { Component } from 'react';
import API from "../../API/Student"
import Email from "../../components/Email";
// import Password from "../../components/Password";
import Homepage from '../general/Homepage';
import Name from "../../components/MemberName";
import { Row, Col, Container, Form } from "react-bootstrap";

class Studentregistration extends Component {
    state = {
        studentfname: "",
        studentlname: "",
        loginemail: "",
        parentfname: "",
        parentlname:"",
        parentphonenumber: "",
        password: "",
        levelcompleted: "",
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
    // setName = (firstname, lastname) => {
    //     this.setState({
    //         studentfname: firstname,
    //         studentlname: lastname
    //     })
    // }
    // setParentName = (firstname, lastname) => {
    //     this.setState({ parentname: firstname + " " + lastname })
    // }

    setName =(field,value) => {
          this.setState({
              [field] :value
          })
    }
    handleStudentCreation = (event) => {
        event.preventDefault();
        console.log("In Student Creation", this.state);
        if (this.state.studentfname === "" ||
            this.state.studentlname === "" ||
            this.state.loginemail === "" ||
            this.state.parentname === "" ||
            this.state.parentphonenumber === "" ||
            this.state.password === "") {
            console.log("Empty fields not accepted", this.state.studentfname.this.state.studentlname, this.state.loginemail, this.state.parentname, this.state.parentphonenumber, this.state.password);
            this.setState({ errmsg: " Enter valid data in all fields " })
        }
        else {
            if (this.state.password === this.state.password1) {
                console.log('Pass')

                let newstudent = {
                    studentfname: this.state.studentfname,
                    studentlname: this.state.studentlname,
                    parentname: this.state.parentfname+ " "+this.state.parentlname,
                    loginemail: this.state.loginemail,
                    password: this.state.password,
                    parentphonenumber: this.state.parentphonenumber
                }
                API.createNewStudent(newstudent)
                    .then(res => {
                        console.log("The response from adding student", res);

                        this.setState({
                            studentfname: '',
                            studentlname: '',
                            parentfname: '',
                            parentlname:'',
                            loginemail: '',
                            parentphonenumber: '',
                            completedcourse: '',
                            completedlevel: '',
                            password: "",
                            errmsg: "Student details registered, A Board member will review your details and contact as soon as possible"
                        })

                        return <Homepage msg="You may login" />
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

                <p className="errmsg">{this.state.errmsg}</p>
                <Container>
                    {/* <form className="inputsection"> */}
                    <Form>
                        <Row>
                            <Col>
                                <Name
                                    name="student"
                                    setName={this.setName} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Name
                                    name="parent"
                                    setName={this.setName} />
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

                        <div className="col-md-6 m-3 p-3">
                            <div className="form-group row">
                                <label className="has-float-label">Completed Course : </label>
                                <select className="form-control droplist"
                                    onChange={this.handleInputChange}
                                    value={this.state.completedcourse} name="completedcourse" >
                                    <option value='None' default>None</option>
                                    <option value='Beginner'>Beginner</option>
                                    <option value='Intermediate'>Intermediate</option>
                                    <option value='Advance'>Advance</option>
                                </select>
                            </div>
                            <div className="form-group row">
                                <label className="has-float-label">Completed Level : </label>
                                <select className="form-control droplist" value={this.state.completedlevel} onChange={this.handleInputChange} name="completedlevel" >
                                    <option value='None' default>None</option>
                                    <option value='Oral'>Oral Examination</option>
                                    <option value='Visual'>Visual Examination</option>
                                    <option value='Written'>Written Examination</option>
                                    <option value='Online'>Online Examination</option>
                                    <option value='Offline'>Offline Examination</option>
                                </select>
                            </div>
                            <div className="form-group row">
                                <label className="has-float-label">Requesting Course : </label>
                                <select className="form-control droplist"
                                    onChange={this.handleInputChange}
                                    value={this.state.completedcourse} name="requestcourse" >
                                    <option value='Beginner'>Beginner</option>
                                    <option value='Intermediate'>Intermediate</option>
                                    <option value='Advance'>Advance</option>
                                </select>
                            </div>
                            <div className="form-group row">
                                <label className="has-float-label">Requesting Level : </label>
                                <select className="form-control droplist" value={this.state.requestlevel} onChange={this.handleInputChange} name="requestlevel" >
                                    <option value='Oral'>Oral Examination</option>
                                    <option value='Visual'>Visual Examination</option>
                                    <option value='Written'>Written Examination</option>
                                    <option value='Online'>Online Examination</option>
                                    <option value='Offline'>Offline Examination</option>
                                </select>
                            </div>
                        </div>

                        <button className="createbutton" name="clcreation" onClick={this.handleStudentCreation}>Create Student account</button>
                        <p>Please consider donating at least $10 per level to cover the basic cost.</p>
                    </Form>
                </Container >
                <br />


            </div >
        ) //end return
    } // end render

} // end class

export default Studentregistration;
