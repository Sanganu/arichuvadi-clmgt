import React, { Component } from 'react';
import API from '../../API/Batch';
import Instructor from "../../components/Masterkey";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import Buttons from "../../components/Buttons";


class Createbatch extends Component {
    state = {
        batchdesc: "",
        course: "Beginner",
        level: "Level-2",
        instructor: '',
        batchdet: '',
        errmsg: '',
        ids: [],
        newbatch: "true",
        message: ""
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        //console.log('The Value in input change',value,name);

        this.setState({
            [name]: value
        });
    };



    handleBatchCreation = (event) => {
        event.preventDefault();
        // console.log("Create Batch -- Creation state values", this.state);
        //var myDate = new Date(this.state.startdate);
        if (this.state.batchdesc === "" ||
            this.state.course === "" ||
            this.state.level === "") {
            // || this.state.instructor === "") {
            console.log("No Empty Fields Enter valid data");
            this.setState({ errmsg: "No Empty Fields Enter valid data" });
        }
        else {

            let newbatchdetails =
                {
                    batchdesc: this.state.batchdesc,
                    course: this.state.course,
                    level: this.state.level,
                    teacher: this.state.instructor,
                }
            if (this.props.usertype === "management") {
                // console.log("Before axios call - create batch",newbatchdetails);
                API.newBatch(newbatchdetails)
                    .then(response => {
                        let newbatch = {
                            bid: response.data._id,
                            batchdesc: response.data.batchdesc,
                            course: response.data.course,
                            level: response.data.level,
                            instructor: response.data.teacher,
                        }
                        console.log("Batch creation", newbatch);
                        this.setState({
                            message: "Batch Successsfully created",
                            batchdesc: "",
                            course: "Beginner",
                            level: "Oral"
                        })


                    })
                    .catch(error => {
                        this.setState({ errmsg: error.errstring + " Please reach out to Board member - there is an error in the process" },
                            () => {
                                console.log("Error in Adding Batch", error.err);
                            });

                    }); //end new batch creation - axios ncall
            } else {
                this.setState({ errmsg: "Only Board members can create batch / cohorts - If you are Board memeber ..Please login as Board memeber, Otherwise reach out to board members" },
                    () => {
                        console.log("Only Board members can create batch / cohorts - If you are Board memeber ..Please login as Board memeber, Otherwise reach out to board members")
                        // return <Boardmember />

                    })
            }//end inner if
        } //end if
    }; // end handleclasscreation


    getInstructor = (value) => {
        this.setState({
            instructor: value
        })
        console.log("Instructor", value)
    }

    render() {

        return (

            <div className="middlecontent">

                <Form className="inputsection">
                    <h5 className="subhead">New Cohort</h5>
                    <h6 className="msg">{this.state.message}</h6>
                    <h6 className="errmsg">{this.state.errmsg}</h6>

                    <Form.Group>
                        <Form.Label>Name    </Form.Label>
                        <Form.Control 
                            id="batchdesc"
                            value={this.state.batchdesc}
                            onChange={this.handleInputChange}
                            name="batchdesc" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Course : </Form.Label>
                        <Form.Control as="select" 
                            onChange={this.handleInputChange}
                            value={this.state.course} name="course" id="course">
                            <option value='Beginner' default>Beginner</option>
                            <option value='Intermediate'>Intermediate</option>
                            <option value='Advance'>Advance</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label >Level </Form.Label>
                        <Form.Control as="select"  value={this.state.level} onChange={this.handleInputChange} name="level" id="level">
                            <option value='Oral' default>Oral Examination</option>
                            <option value='Visual'>Visual Examination</option>
                            <option value='Written'>Written Examination</option>
                            <option value='Online'>Online Examination</option>
                            <option value='Offline'>Offline Examination</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="has-float-label">Instructor </Form.Label>

                        <Instructor IdType="instructor"
                            passMasterId={this.getInstructor} />

                    </Form.Group>

                    <Buttons onButton={this.handleBatchCreation}>Create Batch</Buttons>
                </Form>

            </div>) // end of return

    } // end of render

} // end class

const mapStateToProps = (state) => {
    // console.log("Map State to Props create batch: ",state);
    return {
        loginemail: state.loginemail,
        userfname: state.userfname,
        userlname: state.userlname,
        usertype: state.usertype,
        userid: state.userid
    }

}
export default connect(mapStateToProps)(Createbatch);
