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
                this.setState({items:records.data})
            })
        }
        else if(this.props.IdType === "students"){
            StudentID.getAllStudentId()
            .then((records) => {
                console.log("Rec student ids",records.data) 
                this.setState({items:records.data})
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
                {this.state.items.map((rec, key) =>
                    <option key={key} value={rec._id}>{rec.Fullname}</option>)}
            </select>
        </React.Fragment>)
    }
}

export default Masterkey;
