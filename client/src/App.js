import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//General
import Homepage from "./pages/general/Homepage";
import Search from "./pages/general/Search";
import Appheader from "./components/Appheader";
import Iconbar from "./navigation/Iconbar";
import Ourteam from "./pages/general/Ourteam";
import Alumni from "./pages/general/Alumni";

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

import Batchmain from "./pages/batch/Batchmain"; 
import Createbatch from "./pages/batch/Createbatch";
import Allbatches from "./pages/batch/displayallbatchdetails";
import Addclass from "./pages/batch/Addclassdetails";




// teacher main page

// import Resources from "./pages/Resources";


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
                <Route exact path="/teacher/searchrecords" component={Search} />

                <Route exact path="/board/allbatch" render={props =><Allbatches {...props} />}/>
                <Route exact path="/board/batchmain" component={Batchmain} />
                <Route exact path="/board/createbatch" component={Createbatch} />
                <Route exact path="/board/login" render ={props => <Boardmember {...props} />} />
                <Route exact path="/board/addBoard" component={AddBoardMember}/>
                <Route exact path="/board/profile/update" render={props=><Updateteacher {...props} />} />
                {/* <Route exact path="/addboard" component={Allbatches} /> */}
                                
                <Route exact path="/teacher/batch/addstudent/:batchid" render={props => <Addstudent {...props} />} />
                <Route exact path="/teacher/allteacher" component={Allteachers} />
        

                <Route exact path="/other/newstudent" component={NewStudentregistration} />  
                <Route exact path="/other/students/loginpg" render = { props => <Studentlogin {...props}/>} />
                <Route exact path="/teacher/studentmanagement" component={StudentManagement} />
                       
                <Route exact path="/teacher/batch/addclass" component={Addclass} />
          
                
                
                   {/* <Route exact path="/resources" component={Resources} />
                   <Route exact path="/users/videos" component={Videoreference} /> */}
                   <Route exact path="/ourteam" component={Ourteam} />
                   <Route exact path="/alumni" component={Alumni} />
                
                <Switch>
                  <Route path="*" render ={props => <Homepage {...props}/>}  />
                </Switch>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    )
  }

export default App;