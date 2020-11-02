import React, { Component } from 'react';
import { connect } from "react-redux";

class Updateteacher extends Component {
    
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        }, () => {
            console.log('The Value in input change', value, name);
        });
    } //End Input change

    render() {
        return (<div>
            <h1>Profile</h1>
            <form className="inputsection">
                <div className="form-group">
                    <label className="form-control-placeholder" htmlFor="fname">First Name</label>
                    <input value={this.state.fname}
                           placeholder={this.state.fname}
                           name="fname"
                           id="fname"
                           className="form-control"
                           onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                    <label className="form-control-placeholder" htmlFor="lname">Last Name</label>
                    <input value={this.state.lname}
                           placeholder={this.state.lname}
                           name="lname"
                           id="lname"
                           className="form-control"
                           onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                    <label className="form-control-placeholder" htmlFor="loginemail">Email</label>
                    <input value={this.state.loginemail}
                           placeholder={this.state.loginemail}
                           name="loginemail"
                           id="loginemail"
                           className="form-control"
                           onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                    <label className="form-control-placeholder" htmlFor="telephone">Telephone</label>
                    <input value={this.state.telephone}
                           placeholder={this.state.telephone}
                           name="telephone"
                           id="telephone"
                           className="form-control"
                           onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                    <label className="form-control-placeholder" htmlFor="title">Title</label>
                    <input value={this.state.title}
                           placeholder={this.state.title}
                           name="title"
                           id="title"
                           className="form-control"
                           onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                    <label className="form-control-placeholder" htmlFor="zoomlink">Zoom link</label>
                    <input value={this.state.zoomlink}
                           placeholder={this.state.zoomlink}
                           name="zoomlink"
                           id="zoomlink"
                           className="form-control"
                           onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                    <label className="form-control-placeholder" htmlFor="zoomlink">Zoom link</label>
                    <input value={this.state.skypeId}
                           placeholder={this.state.skypeId}
                           name="skypeId"
                           id="skypeId"
                           className="form-control"
                           onChange={this.handleInputChange} />
                </div>
            </form>
            <h3>{this.props.userlname+", "+this.props.userfname}</h3>
         
       </div>);
    }
}

const mapStateToProps = (state) => {
    console.log("Map State to Props : ",state)
    return {
      loginemail:state.loginemail,
      userfname:state.userfname,
      userlname:state.userlname,
      usertype:state.usertype,
      userid:state.userid
    }
    
} 

export default connect(mapStateToProps)(Updateteacher);