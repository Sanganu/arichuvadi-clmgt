import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Teachermain from "./pages/Teachermain"; //Both teacher and student login
import Batchmain from "./pages/Batchmain"; // teacher main page
import Createbatch from "./pages/Createbatch";
import Addstudent from "./pages/Addstudent";
import Homepage from "./pages/Homepage";
import Videoreference from "./pages/Videoreference";
import Resources from "./pages/Resources";
import Allbatches from "./pages/displayallbatchdetails"
import Studentlogin from "./pages/Studentlogin";
import Addclass from "./pages/Addclassdetails";
import Search from "./pages/Search";
import StudentManagement from './pages/StudentManagement';
import Updateteacher from "./pages/Updateteacher";
import Teacherheader from "./components/Teacherheader";
import {Menubar} from "./components/Menubar";
import Topmenu from "./components/Topmenu";
import Allteachers from "./pages/Teachermanagement";
import Ourteam from "./pages/Ourteam";
import Alumni from "./pages/Alumni";
// import InstructorLogin from "./pages/InstructorLogin";


//const store = createStore()

class App extends Component {
  state = {
    isLogedIn: false,
    role:''
  }

  // validLogin = (user) => {
  //   this.setState({
  //     isLogedIn:true,
  //     role:user.role,
  //     username:user.username
  //   },() => {
  //     console.log("Logged In");
  //   });
  // }

  render() {
    return (
      <Router>
        <div>
          <Teacherheader />
          <div className='row'>
            <div className='col-md-12 col-sm-12 col-lg-1'>
            {this.state.isLogedIn ?
                     <Topmenu/>
                    :<Menubar/>}
            </div>
            <div className='col-md-12 col-sm-12 col-lg-11'>
                {this.state.className?
                  <h3>Welcome </h3>
                 :<div></div>}
              <Switch>
                <Route exact path="/teacher/allbatch" component={Allbatches} />
                <Route exact path="/" component={Homepage} />
                <Route exact path="/teacher/login" component ={Teachermain}/>
                {/* <Route exact path="/teacher/login" render ={ () =>{
                  <Teachermain  validLogin = {this.validLogin}/> }}/> */}
                  <Route exact path="/other/students/loginpg" component= {Studentlogin} />
{/*        
                <Route exact path="/other/students/loginpg" component= { () =>{ 
                  <Studentlogin validLogin = {this.validLogin}/>}} /> */}
                <Route exact path="/users/videos" component={Videoreference} />
                <Route exact path="/teacher/batchmain" component={Batchmain} />
                <Route exact path="/teacher/createbatch" component={Createbatch} />
                <Route exact path="/teacher/batch/addstudent/:batchid" component={Addstudent} />
                <Route exact path="/resources" component={Resources} />
                <Route exact path="/teacher/batch/addclass" component={Addclass} />
                <Route exact path="/teacher/searchrecords" component={Search} />
                <Route exact path="/teacher/studentmanagement" component={StudentManagement} />
                <Route exact path="/teacher/profile/update" component={Updateteacher} />
                <Route exact path="/teacher/allteacher" component={Allteachers} />
                <Route exact path="/ourteam" component={Ourteam} />
                <Route exact path="/alumni" component={Alumni} />
                <Switch>
                  <Route path="/*" component={Homepage} />
                </Switch>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;