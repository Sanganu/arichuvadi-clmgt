import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Homepage from "./pages/general/Homepage";

import Boardmember from "./pages/board/Boardmember"; //Both teacher and student login
import Updateteacher from "./pages/instructor/Updateinstructor";
import Allteachers from "./pages/instructor/Instructormanagement";
import AddBoardMember from "./pages/instructor/Addinstructor";

import Batchmain from "./pages/batch/Batchmain"; // teacher main page
import Createbatch from "./pages/batch/Createbatch";
import Allbatches from "./pages/batch/displayallbatchdetails";
import Addclass from "./pages/batch/Addclassdetails";

import Studentlogin from "./pages/student/Studentlogin";
import StudentManagement from './pages/student/StudentManagement';
import NewStudentregistration from "./pages/student/NewStudentregistration";
import Addstudent from "./pages/student/Addstudent";

import Search from "./pages/general/Search";
import Appheader from "./components/Appheader";
import Iconbar from "./navigation/Iconbar";

// import Resources from "./pages/Resources";
import Ourteam from "./pages/general/Ourteam";
import Alumni from "./pages/general/Alumni";
import Addboard from "./pages/board/NewBoardMember";

import "./bootstrap.css";


const  App = ()=> {

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
                <Route exact path="/" render={()=> <Homepage />} />
                
                <Route exact path="/teacher/allbatch" component={Allbatches} />
                <Route exact path="/teacher/batchmain" component={Batchmain} />
                <Route exact path="/teacher/createbatch" component={Createbatch} />
                
                <Route exact path="/addboard" component={Allbatches} />
                <Route exact path="/teacher/login" component ={Boardmember}/>
                <Route exact path="/important" component ={AddBoardMember}/>
                <Route exact path="/teacher/batch/addstudent/:batchid" component={Addstudent} />
                <Route exact path="/teacher/allteacher" component={Allteachers} />
                <Route exact path="/teacher/profile/update" component={Updateteacher} />

                <Route exact path="/other/newstudent" component={NewStudentregistration} />  
                <Route exact path="/other/students/loginpg" component= {Studentlogin} />
                <Route exact path="/teacher/studentmanagement" component={StudentManagement} />
           
             
                <Route exact path="/teacher/batch/addclass" component={Addclass} />
                <Route exact path="/teacher/searchrecords" component={Search} />
                <Route exact path="/teacher/addBoard" component={Addboard}/>
                
                   {/* <Route exact path="/resources" component={Resources} />
                   <Route exact path="/users/videos" component={Videoreference} /> */}
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

export default App;