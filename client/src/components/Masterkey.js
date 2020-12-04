import React, { Component } from 'react';
import InstructorID from "../API/Multi";
import StudentID from "../API/Student";

class Masterkey extends Component {
    state = {
        items: [],
        masterID: this.props.Id || ""
    }
    componentDidMount = ()=>{
        if(this.props.IdType === "instructor"){
            InstructorID.getAllInstructors()
            .then((records) => {
                console.log("Rec instructors id",records.data) 
                this.setState({items:records.data,
                masterID:records.data[0]._id || ""})
            })
        }
        else if(this.props.IdType === "students"){
            StudentID.getAllStudentId()
            .then((records) => {
                console.log("Rec student ids",records.data) 
                this.setState({items:records.data,
                    masterID:records.data[0]._id || ""})
            })
        }
        console.log(this.state.items)
         // return(<Homepage msg="Please Login"/>);
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log('The Value in input change',value,name,target);

        this.setState({
           masterID:value
        });
        this.props.passMasterId(value)
    };
    render() {
        return (<React.Fragment>
            <select className="form-control droplist" onChange={this.handleInputChange} name="masterKey" value={this.state.masterID}>
            <option key="first" value="">Please select One</option>
                {this.state.items.map((rec, key) =>
                    <option key={key} value={rec._id}>{rec.Fullname}</option>)}
            </select>
        </React.Fragment>)
    }
}

export default Masterkey;
