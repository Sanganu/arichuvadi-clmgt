import React, { Component } from 'react';
import API from '../../API/Board';
import Homepage from "../general/Homepage";

class AddBoardMember extends Component {
    state = {
        fname: "",
        lname: "",
        designation: "Board Member",
        description:"",
        loginemail: "",
        errmsg: "",
        phone: "",
        password:"",
        zoomlink:"",
        skypeId:"",
        password1:""
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        }, () => {
            //console.log('The Value in input change', value, name);
        });

    }

    handleBoardMemberCreation = (event) => {
        event.preventDefault();
        console.log("In Boad Member Account Creation state values", this.state);
        //var myDate = new Date(this.state.startdate);
        if (this.state.fname === "" ||
            this.state.lname === "" ||
            this.state.description === "" ||
            this.state.designation === "" ||
            this.state.password === "" ||
            this.state.password1 === "" ||
            this.state.loginemail === "") {
            console.log("No Empty Fields Enter valid data");
            this.setState({ errmsg: "No Empty Fields Enter valid data" });
        }
        else {
           // console.log("Axios with new board",this.state.fname)
           let member =
                {
                    fname: this.state.fname,
                    lname: this.state.lname,
                    password: this.state.password,
                    loginemail: this.state.loginemail.toLocaleLowerCase(),
                    designation: this.state.designation,
                    phone: this.state.phone,
                    description:this.state.description,
                    zoomlink: this.state.zoomlink,
                    skypeId:this.state.skypeId
                }
            API.createBoardMember(member)
                .then(response => {
                    console.log("The response create BoardMember Account", response);
                    //console.log("The  inserted board ID", response.data._id);
                    this.setState({
                        fname: "",
                        lname: "",
                        designation: "BoardMember",
                        loginemail: "",
                        errmsg: "",
                        phone: "",
                        password:"",
                        password1:"",
                        description:"",
                        skypeId:"",
                        zoomlink:""
                    },() =>{ 
                        //console.log("Set State - clear fiels")
                    });
                    // this.props.handleNewBoardmember({
                    //     fname: this.response.data.fname,
                    //     lname: this.response.data.lname,
                    //     loginemail:this.response.data.loginemail,
                    //     phone:this.response.data.phone,
                    //     designation:this.response.data.designation,
                    //     description:this.response.data.description,
                    //     zoomlink:this.response.data.zoomlink,
                    //     skypeId:this.response.data.skypeId
                    // });
                    return <Homepage />
                    
                })
                .catch(error => {
                    // this.setState({ errmsg: error.errstring + " Please check console for further details" }, () => {
                    //    console.log("Error in Adding Board memberr details", error.err);
                    // });
                    console.log("error",error)

                }); //end new batch creation - axios call
        } //end if
    };  // end handleclasscreation

    render() {
        return (           
            <div className="container middlecontent">
                        <form className="inputsection">
                            <h5 className="subhead has-float-label">Create Management Team </h5>
                            <h6>Founder/Board Members/Website Design and Development</h6>
                            <p className="errmsg">{this.state.errmsg}</p>

                            <div className="form-group row">
                                <label className="has-float-label">First Name </label>
                                <input type="text"
                                    className="form-control"
                                    value={this.state.fname}
                                    onChange={this.handleInputChange}
                                    name="fname" />
                            </div>
                            <div className="form-group row">
                                <label className="has-float-label">Last Name </label>
                                <input type="text"
                                    className="form-control"
                                    id="lname"
                                    value={this.state.lname}
                                    onChange={this.handleInputChange}
                                    name="lname" />
                            </div>
                            <div className="form-group row">
                                <label className="has-float-label" forhtml="loginemail">Login Email</label>
                                <input className="form-control"
                                    value={this.state.loginemail}
                                    onChange={this.handleInputChange}
                                    type="text"
                                    name="loginemail"
                                 />
                            </div>
                            <div className="form-group row">
                                <label className="has-float-label">Password </label>
                                <input type="password"
                                    className="form-control"
                                    value={this.state.password}
                                    onChange={this.handleInputChange}
                                    name="password" />
                            </div>
                            <div className="form-group row">
                                <label className="has-float-label">ReType Password </label>
                                <input type="password"
                                    className="form-control"
                                    value={this.state.password1}
                                    onChange={this.handleInputChange}
                                    name="password1" />
                            </div>
                            <div className="form-group row">
                                <label className="has-float-label" forhtml="designation"></label>
                                <select className="form-control droplist"
                                    onChange={this.handleInputChange}
                                    value={this.state.position}
                                    name="designation">
                                    <option value='Board' default>Founder</option>
                                    <option value='Board' default>Board Member</option>
                                    <option value='IT'>Web Site Manager</option>
                                    <option value='IT'>Web Master</option>
                                    <option value='Management'>Management</option>
                                </select>
                            </div>
                            <div className="form-group row">
                                <label className="has-float-label">About yourself </label>
                                <input type="text"
                                    className="form-control"
                                    value={this.state.description}
                                    onChange={this.handleInputChange}
                                    name="description" />
                            </div>
                            <div className="form-group row">
                                <label className="has-float-label">Phone </label>
                                <input type="text"
                                    className="form-control"
                                    value={this.state.phone}
                                    onChange={this.handleInputChange}
                                    name="phone" />
                            </div>
                            <div className="form-group row">
                                <label className="has-float-label">Zoom Link </label>
                                <input type="text"
                                    className="form-control"
                                    value={this.state.zoomlink}
                                    onChange={this.handleInputChange}
                                    name="zoomlink" />
                            </div>                           
                           
                            <div className="form-group row">
                                <label className="has-float-label">SkypeId </label>
                                <input type="text"
                                    className="form-control"
                                    value={this.state.skypeId}
                                    onChange={this.handleInputChange}
                                    name="skypeId" />
                            </div>
                            <button className="createteacher"
                                name="clcreation"
                                onClick={this.handleBoardMemberCreation }>
                                Add Board member</button>
                        </form>
                    </div>
                 )
     }
}
export default AddBoardMember;
