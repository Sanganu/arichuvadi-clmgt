import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//General
import Homepage from "./pages/general/Homepage";
import Search from "./pages/general/Search";
import Appheader from "./components/Appheader";
import Iconbar from "./navigation/Iconbar";
import Ourteam from "./pages/general/Ourteam";
import Alumni from "./pages/general/Alumni";
import Footer from "./components/Stfooter";
//Board Member
import AddBoardMember from "./pages/board/AddBoardMember";
import Boardmember from "./pages/board/Boardmember";



//Instructor
import Updateteacher from "./pages/instructor/Updateinstructor";
import Allteachers from "./pages/instructor/Instructormanagement";
//Student
import Studentlogin from "./pages/student/Studentlogin";
import StudentManagement from './pages/student/StudentManagement';
import NewStudentregistration from "./pages/student/NewStudentregistration";
import Addstudent from "./pages/student/Addstudent";

//Batch

// import Batchmain from "./pages/batch/Batchmain";
import Createbatch from "./pages/batch/Createbatch";
import Allbatches from "./pages/batch/Displayallbatchdetails";
import Addclass from "./pages/batch/Addclassdetails";

import Dashboard from "./pages/board/Dashboard";


// teacher main page

// import Resources from "./pages/Resources";


import "./bootstrap.css";


const App = () => {

  return (
    <Router>
      <div>
        <Appheader />
        <div className='row'>
                <div className='col-sm-2 col-md-2  col-lg-1'>
                  <Iconbar />
                </div>
                <div className='col-sm-10 col-md-10 col-lg-11'>
  
                      <Switch>
                        <Route exact path="/" render={() => <Homepage />} />


                        <Route exact path="/board/searchrecords" component={Search} />
                        <Route exact path="/board/allbatch/:displayall" render={props => <Allbatches {...props} displayall="true" />} />
                        {/* <Route exact path="/board/batchmain" component={Batchmain} /> */}
                        <Route exact path="/board/createbatch" render={props => <Createbatch {...props} />}/>
                        <Route exact path="/board/dashboard" compoenent={props => <Dashboard {...props}/>} />
                        <Route exact path="/board/addBoard" component={AddBoardMember} />
                        <Route exact path="/board/login" render={props => <Boardmember {...props} />} />
                        <Route exact path="/board/batch/addstudent/:batchid" render={props => <Addstudent {...props} />} />
                        <Route exact path="/board/profile/update" render={props => <Updateteacher {...props} />} />
                        {/* <Route exact path="/addboard" component={Allbatches} /> */}


                        <Route exact path="/teacher/allteacher" component={Allteachers} />
                        <Route exact path="/teacher/batch/addclass" component={Addclass} />

                        <Route exact path="/student/newstudent" component={NewStudentregistration} />
                        <Route exact path="/student/studentmanagement" component={StudentManagement} />
                        <Route exact path="/student/loginpg" render={props => <Studentlogin {...props} />} />



                        {/* <Route exact path="/resources" component={Resources} />
                            <Route exact path="/users/videos" component={Videoreference} /> */}
                        <Route exact path="/ourteam" component={Ourteam} />
                        <Route exact path="/alumni" component={Alumni} />

                        <Switch>
                          <Route path="*" render={props => <Homepage {...props} />} />
                        </Switch>
                      </Switch>
                  </div>
                </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App;