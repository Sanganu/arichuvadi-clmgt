import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import axios from 'axios';
import Studentmain from './Studentmain';
import { connect } from 'react-redux';
import { loginCredentials } from '../../reduxAction/dispatchLoginCredentials';


class Studentlogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vemail: '',
      vpword: '',
      vuname: '',
      showstlogin: true,
      studentrecord: {},
      classdet: []
    };

  } //end constructor
  
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    //console.log('The Value in input c hange',value,name);

    this.setState({
      [name]: value
    } /*,
                        () =>{
                          console.log('Set State in Main Section',value,name);
                        } */);
  }; //end handle input cjange


  logincheck = (event) => {
    event.preventDefault();
    console.log("Student's Login");
    if (this.state.vemail === "" ||
      this.state.vpword === "") {
      console.log('Enter Valid Credentials in all fields');
      this.setState({
        invalid: true,
        errmsg: "Blank fields .. Enter valid credentials"
      });

    }
    else {
      this.setState({ errmsg: "" });
      axios.post('/auth/login',
        {
          loginemail: this.state.vemail,
          password: this.state.vpword,
          usertype:"student"
        })
        .then((response) => {
          // console.log("The response from axios", response.data);
          //  console.log("The classes details", response.data.classes);
          if (response.data.studentrecord) {
            this.setState({
              showstlogin: false,
              studentrecord: (response.data.studentrecord),
              classdet: (response.data.classes) || "{lessoncovered:'No Class details exist',homework:'Please contact boardmembers or instructors} cldate:''"},
              () => {
                // console.log("State Student Record", this.state.studentrecord);
                // console.log("Class details",this.state.classdet);
                
                var userobj = {
                  loginemail: response.data.studentrecord.email,
                  usertype: 'student',
                  invalid: false,
                  userfname: response.data.studentrecord.fname,
                  userlname: response.data.studentrecord.lname,
                  userid: response.data.studentrecord.stdid
                }
                this.props.setCredetials(userobj);
              });
          }
          else {
            console.log("Error!! - student login does not exist", );
            this.setState({
              errmsg: "Error!! Enter valid credentials !!!",
              showstlogin: true
            });
          }
        })
        .catch((error) => {

          console.log("Error in validating student login ", error);
          this.setState({
            errmsg: "Invaild Student login! Enter valid credentials or Contact your Teacher",
            showstlogin: true
          });
        });
    } //end else

  } // end login check


  render() {
    return (<div>
    
      <div className="container middlecontent">
            {this.state.showstlogin ?
              <form className="inputsection">
                <h3>Student Login </h3>
                <h5 className="errmsg">{this.state.errmsg}</h5>
                <div className="form-group">
                  <label htmlFor="vemail"
                    className="form-control-place">
                   Username</label>
                  <input className="form-control"
                    onChange={this.handleInputChange}
                    type="text" name="vemail"
                    value={this.state.vemail} />
                </div>

                <div className="form-group">
                  <label htmlFor="vpword"
                    className="form-control-place">Password</label>
                  <input className="form-control"
                    onChange={this.handleInputChange}
                    type="password"
                    name="vpword" value={this.state.vpword} />
                </div>

                <button className="createbutton" id="blogin" onClick={this.logincheck}>Login</button>
              </form>

              : <div><Studentmain
                studentdet={this.state.studentrecord}
                classrecords={this.state.classdet} /></div>}
          </div> 
      </div>
   ) //end return
  } //end render

} //end class Student Main

const mapDispatchToProps = (dispatch) => {
  return {
      setCredetials: (userCred) => {
          dispatch(loginCredentials(userCred))
      }
  }
}

export default connect(null,mapDispatchToProps)(Studentlogin);
