import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Boardmember from "./pages/Boardmember"; //Both teacher and student login
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
import Appheader from "./components/Appheader";
import Iconbar from "./components/Iconbar";
import Allteachers from "./pages/Teachermanagement";
import Ourteam from "./pages/Ourteam";
import Alumni from "./pages/Alumni";
import Studentregistration from "./pages/Studentregistration";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Appheader />
          <div className='row'>
            <div className='col-md-12 col-sm-12 col-lg-1'>
               <Iconbar />
            </div>
            <div className='col-md-12 col-sm-12 col-lg-11'>
               
              <Switch>
                <Route exact path="/teacher/allbatch" component={Allbatches} />
                <Route exact path="/" component={Homepage} />
                <Route exact path="/teacher/login" component ={Boardmember}/>
                <Route exact path="/other/students/loginpg" component= {Studentlogin} />
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
                <Route exact path="/other/newstudent" component={Studentregistration} />
                 <Route exact path="/ourteam" component={Ourteam} />
                <Route exact path="/alumni" component={Alumni} />
                <Switch>
                  <Route path="*" component={Homepage} />
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