import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import axios from 'axios';
import Studentmain from './Studentmain';
import Teacherheader from '../components/Teacherheader';
import { Menubar } from '../components/Menubar';

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
      axios.post('/auth/student/login',
        {
          loginemail: this.state.vemail,
          password: this.state.vpword
        })
        .then((response) => {
          console.log("The response from axios", response.data);
          //  console.log("The classes details", response.data.classes);
          if (response.data.studentrecord) {
            this.setState({
              showstlogin: false,
              studentrecord: (response.data.studentrecord),
              classdet: (response.data.classes) || ""
            },
              () => {
                console.log("State Student Record", this.state.studentrecord);
                console.log("Class details",this.state.classdet);
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
      <Teacherheader />
      <div className="container middlecontent">

        <div className="row" >
          <div className="col-lg-1 col-sm-12 col-md-12">
            <Menubar />
          </div>
          <div className="col-lg-9 col-sm-11 col-md-10">
            {this.state.showstlogin ?
              <form className="inputsection">
                <h3>Student Login </h3>
                <h5 className="errmsg">{this.state.errmsg}</h5>
                <div className="form-group">
                  <label htmlFor="vemail"
                    className="form-control-place">
                    Email Addess</label>
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
    </div>  
  </div >) //end return
  } //end render

} //end class Student Main


export default Studentlogin;
