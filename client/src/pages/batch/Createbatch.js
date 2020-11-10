import React, { Component } from 'react';
import API from '../../API/Batch';
import Batchmain from "./Batchmain" ;
import Instructor from "../../components/Masterkey";
import InstructorID from "../../API/Multi";
import { connect } from "react-redux";

class Createbatch extends Component {
    state = {
        batchdesc: "",
        course: "Beginner",
        level: "Level-2",
        instructor: '',
        batchdet: '',
        errmsg: '',
        ids:[]
    }
    componentDidMount = ()=>{
        InstructorID.getAllInstructors()
        .then((records) => {
            console.log("Rec",records.data) 
            this.setState({ids:records.data})
        })
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
        console.log("Create Batch -- Creation state values", this.state);
        //var myDate = new Date(this.state.startdate);
        if (this.state.batchdesc === "" ||
            this.state.course === "" ||
            this.state.level === "" ){
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
                if(this.props.usertype === "management"){
                console.log("Before axios call - create batch",newbatchdetails);
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
                    // this.props.onInsert(newbatch)
                     return <Batchmain />
                })
                .catch(error => {
                    this.setState({ errmsg: error.errstring + " Please check console for further details" },
                        () => {
                            console.log("Error in Adding Batch", error.err);
                        });

                }); //end new batch creation - axios ncall
            }else{
                console.log("Only Board members can create batch / cohorts - If you are Board memeber ..Please login as Board memeber, Otherwise teach out to board members")
            }
        } //end if
    }; // end handleclasscreation
    getInstructor =(value) =>{
        this.setState({
            instructor:value
        })
        console.log("Instructor",value)
    }

    render() {
        return (        <div className="middlecontent">
                   
                        <form className="inputsection">
                            <h5 className="subhead">New Cohort</h5>
                            <p className="errmsg">{this.state.errmsg}</p>

                            <div className="form-group row">
                                <label className="has-float-label">Name    </label>
                                <input type="text"
                                    className="form-control"
                                    id="batchdesc"
                                    value={this.state.batchdesc}
                                    onChange={this.handleInputChange}
                                    name="batchdesc" />
                            </div>
                            <div className="form-group row">
                                <label className="has-float-label">Course : </label>
                                <select className="form-control droplist"
                                    onChange={this.handleInputChange}
                                    value={this.state.course} name="course" id="course">
                                    <option value='Beginner' default>Beginner</option>
                                    <option value='Intermediate'>Intermediate</option>
                                    <option value='Advance'>Advance</option>
                                </select>
                            </div>
                            <div className="form-group row">
                                <label className="has-float-label">Level </label>
                                <select className="form-control droplist" value={this.state.level} onChange={this.handleInputChange} name="level" id="level">
                                    <option value='Oral' default>Oral Examination</option>
                                    <option value='Visual'>Visual Examination</option>
                                    <option value='Written'>Written Examination</option>
                                    <option value='Online'>Online Examination</option>
                                    <option value='Offline'>Offline Examination</option>
                                </select>
                            </div>
                            <div className="form-group row">
                                <label className="has-float-label">Instructor </label>
                              
                                <Instructor items={this.state.ids}
                                 passInstructor={this.getInstructor}/>
                       
                            </div>

                            <button className="createbutton" name="clcreation" onClick={this.handleBatchCreation}>Create Batch</button>
                        </form>
             
                 </div>) // end of return
        } // end of render
  
  } // end class
  
  const mapStateToProps = (state) => { 
    console.log("Map State to Props create batch: ",state);
    return {
      loginemail:state.loginemail,
      userfname:state.userfname,
      userlname:state.userlname,
      usertype:state.usertype,
      userid:state.userid
    }
    
  }
  export default connect(mapStateToProps)(Createbatch);
