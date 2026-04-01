import React, { Component } from 'react';
import API from '../../API/Batch';
import BoardAPI from '../../API/Board';
import Instructor from "../../components/Masterkey";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import Buttons from "../../components/Buttons";
import { loginCredentials } from '../../reduxAction/dispatchLoginCredentials';


class Createbatch extends Component {
    state = {
        batchdesc: "",
        course: "Beginner",
        level: "Level-2",
        instructor: '',
        teacherModel: 'Boarddetails',
        batchdet: '',
        errmsg: '',
        ids: [],
        newbatch: "true",
        message: "",
        examdate:"",
        sessionResolved: false
    }

    componentDidMount() {
        if (this.props.usertype === "management") {
            this.setState({ sessionResolved: true });
            return;
        }
        BoardAPI.getBoardMe()
            .then((res) => {
                const u = res.data;
                if (u && u.role === "board") {
                    this.props.setCredentials({
                        loginemail: u.loginemail,
                        usertype: "management",
                        invalid: false,
                        userid: u.id,
                        userfname: "",
                        userlname: ""
                    });
                }
            })
            .catch(() => {})
            .finally(() => {
                this.setState({ sessionResolved: true });
            });
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
        if (this.props.usertype === "management") {
                    if (this.state.batchdesc === "" ||
                        this.state.course === "" ||
                        this.state.level === "" ||
                        !this.state.instructor) {
                        console.log("No Empty Fields Enter valid data");
                        this.setState({ errmsg: "Fill all fields and select an instructor." });
                    }
                    else {

                                let newbatchdetails =
                                    {
                                        batchdesc: this.state.batchdesc,
                                        course: this.state.course,
                                        level: this.state.level,
                                        teacher: this.state.instructor,
                                        teacherModel: this.state.teacherModel,
                                        examDate:this.state.examdate
                                    }
       
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
                                                level: "Oral",
                                                examdate:""
                                            })


                                        }).catch(error => {
                                            const apiMsg = error.response?.data?.error
                                                || error.response?.data?.message
                                                || (typeof error.response?.data === 'string' ? error.response.data : null);
                                            const msg = apiMsg || error.message || "Error creating batch";
                                            this.setState({ errmsg: msg },
                                                () => {
                                                    console.log("Error in Adding Batch", error.response?.data || error.message);
                                                });

                                        }); //end new batch creation - axios ncall
                              }    //end inner if                
            } else {
                this.setState({ errmsg: "Only Board members can create batch / cohorts - If you are Board memeber ..Please login as Board memeber, Otherwise reach out to board members" },
                    () => {
                        console.log("Only Board members can create batch / cohorts - If you are Board memeber ..Please login as Board memeber, Otherwise reach out to board members")
                        // return <Boardmember />

                    })
  
        } //end outer  if
    }; // end handleclasscreation


    getInstructor = (value) => {
        if (value && typeof value === "object") {
            this.setState({
                instructor: value.id || "",
                teacherModel: value.teacherModel || "Boarddetails"
            });
        } else {
            this.setState({ instructor: value || "", teacherModel: "Boarddetails" });
        }
        console.log("Instructor", value)
    }

    render() {
        if (!this.state.sessionResolved) {
            return (
                <div className="middlecontent">
                    <p className="msg">Checking your session…</p>
                </div>
            );
        }

        if (this.props.usertype !== "management") {
            return (
                <div className="middlecontent">
                    <h6 className="errmsg">
                        Please log in as a board member (Board Member login). If you already logged in, try refreshing the page.
                    </h6>
                </div>
            );
        }

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
                    <Form.Group>
                        <Form.Label>Exam Date   </Form.Label>
                        <Form.Control 
                            id="examdate"
                            type = "date"
                            value={this.state.examdate}
                            onChange={this.handleInputChange}
                            name="examdate" />
                    </Form.Group>
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

const mapDispatchToProps = (dispatch) => ({
    setCredentials: (userCred) => dispatch(loginCredentials(userCred))
});

export default connect(mapStateToProps, mapDispatchToProps)(Createbatch);
