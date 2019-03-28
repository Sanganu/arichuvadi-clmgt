import React from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Teachermain from "./pages/Teachermain"; //Both teacher and student login
import Batchmain from "./pages/Batchmain" ; // teacher main page
import Createbatch from "./pages/Createbatch";
import Addstudent from "./pages/Addstudent";
import Homepage from "./pages/Homepage";
import Visitors from "./pages/Visitors";
import Books from "./components/Books";
import Allbatches from "./pages/displayallbatchdetails"
import Studentlogin from "./pages/Studentlogin";
import Addclass from "./pages/Addclassdetails";
import Search from "./pages/Search";
import StudentManagement from './pages/StudentManagement';
// import InstructorLogin from "./pages/InstructorLogin";
import Addteacher from "./pages/Addteacher";


const App = () =>
 <Router>
          <div>
          <Switch>
                   <Route exact path = "/" component = {Homepage}/>
                   <Route exact path = "/teacher/allbatch" component = {Allbatches}/>
                   <Route exact path = "/teacher/tmain" component = {Teachermain}/>
                   <Route exact path = "/other/students/loginpg" component = {Studentlogin}/>
                   <Route exact path = "/other/users" component = {Visitors}/>
                   <Route exact path="/teacher/batchmain" component={Batchmain} />
                   <Route exact path="/teacher/createbatch" component={Createbatch} />
                   <Route exact path ="/teacher/batch/addstudent/:batchid" component={Addstudent} />
                   <Route exact path ="/teacher/batch/aclass" component={Addclass} />
                   <Route exact path ="/teacher/batch/addclass" component={Addclass} />
                   <Route exact path = "/resources" component = {Books}/>
                   <Route exact path ="/teacher/batch/addclass" component={Addclass} />
                   <Route exact path ="/teacher/searchrecords" component={Search} />
                   <Route exact path = "/teacher/studentmanagement" component = {StudentManagement} />
                   <Route exact path = "/teacher/addteacher" component = {Addteacher} />
                   {/* <Route exact path="/teacher/login" component = {InstructorLogin} /> */}
                   <Switch>
                      <Route path ="/*" component={Homepage} />
                   </Switch> 
            </Switch>
          </div>
  </Router>;



export default App;
