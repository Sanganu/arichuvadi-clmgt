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
import Addteacher from "./pages/Addteacher";
import Teacherheader from "./components/Teacherheader";
import {Menubar} from "./components/Menubar";
import Topmenu from "./components/Topmenu";
// import InstructorLogin from "./pages/InstructorLogin";



class App extends Component {
  state = {
    isLoogedIn: false
  }
  render() {
    return (
      <Router>
        <div>
          <Teacherheader />
          <div className='row'>
            <div className='col-md-1 col-sm-1 col-lg-1'>
               <Topmenu />
            </div>
            <div className='col-md-11 col-sm-11 col-lg-11'>
              <Switch>
                <Route exact path="/teacher/allbatch" component={Allbatches} />
                <Route exact path="/" component={Homepage} />
                <Route exact path="/teacher/tmain" component={Teachermain} />
                <Route exact path="/other/students/loginpg" component={Studentlogin} />
                <Route exact path="/users/videos" component={Videoreference} />
                <Route exact path="/teacher/batchmain" component={Batchmain} />
                <Route exact path="/teacher/createbatch" component={Createbatch} />
                <Route exact path="/teacher/batch/addstudent/:batchid" component={Addstudent} />
                <Route exact path="/resources" component={Resources} />
                <Route exact path="/teacher/batch/addclass" component={Addclass} />
                <Route exact path="/teacher/searchrecords" component={Search} />
                <Route exact path="/teacher/studentmanagement" component={StudentManagement} />
                <Route exact path="/teacher/addteacher" component={Addteacher} />
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