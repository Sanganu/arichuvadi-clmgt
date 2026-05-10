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
                const items = records.data || [];
                const matched =
                  (this.props.Id != null &&
                    this.props.Id !== "" &&
                    items.find((x) => String(x._id) === String(this.props.Id))) ||
                  items[0];
                const masterID = matched?._id != null ? String(matched._id) : "";
                console.log("Master ID", masterID,matched);
                this.setState({ items, masterID }, () => {
                    if (matched && this.props.passMasterId) {
                        this.props.passMasterId({
                            id: masterID,
                            teacherModel: matched.teacherModel || "Boarddetails"
                        });
                    }
                });
            })
            .catch((err) => {
                console.error("getAllInstructors failed", err);
                this.setState({ items: [], masterID: "" });
            });
        }
        else if(this.props.IdType === "student"){
            StudentID.getAllStudentId()
            .then((records) => {
                const items = records.data || [];
                const first = items[0];
                const masterID = first?._id != null ? String(first._id) : "";
                this.setState({ items, masterID }, () => {
                    if (first && this.props.passMasterId) {
                        this.props.passMasterId(String(first._id));
                    }
                });
            })
            .catch((err) => {
                console.error("getAllStudentId failed", err);
                this.setState({ items: [], masterID: "" });
            });
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const index = event.nativeEvent.target.selectedIndex;
        const display = event.nativeEvent.target[index].text   
        console.log('The Value in input change',value,name,display);

        this.setState({
           masterID:value
        });
        console.log(value,display)
        if (this.props.IdType === "instructor") {
            const rec = this.state.items.find((x) => String(x._id) === String(value));
            this.props.passMasterId({
                id: value,
                teacherModel: rec?.teacherModel || "Boarddetails"
            });
        } else {
            this.props.passMasterId(value);
        }
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
