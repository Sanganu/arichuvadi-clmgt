import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Homepage from "./pages/Homepage";

import Boardmember from "./pages/Boardmember"; //Both teacher and student login
import Updateteacher from "./pages/Updateteacher";
import Allteachers from "./pages/Teachermanagement";
import AddBoardMember from "./pages/AddBoardMember";

import Batchmain from "./pages/Batchmain"; // teacher main page
import Createbatch from "./pages/Createbatch";
import Allbatches from "./pages/displayallbatchdetails";
import Addclass from "./pages/Addclassdetails";




import Studentlogin from "./pages/student/Studentlogin";
import StudentManagement from './pages/StudentManagement';
import NewStudentregistration from "./pages/student/NewStudentregistration";
import Addstudent from "./pages/Addstudent";

import Search from "./pages/Search";
import Appheader from "./components/Appheader";
import Iconbar from "./components/Iconbar";
import Videoreference from "./pages/Videoreference";
import Resources from "./pages/Resources";
import Ourteam from "./pages/Ourteam";
import Alumni from "./pages/Alumni";
import Addboard from "./pages/board/NewBoardMember";

// import "./index.css";


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
                
                   <Route exact path="/resources" component={Resources} />
                   <Route exact path="/users/videos" component={Videoreference} />
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