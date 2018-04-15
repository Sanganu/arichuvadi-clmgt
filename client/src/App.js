import React from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Teachermain from "./pages/Teachermain"; //Both teacher and student login
import Batchmain from "./pages/Batchmain" ; // teacher main page
import Createbatch from "./pages/Createbatch";
import Addstudent from "./pages/Addstudent";
import Homepage from "./pages/Homepage";
import Visitors from "./pages/Visitors";
import Completebatchdetails from "./pages/Completebatchdetails";
import Allbatches from "./pages/displayallbatchdetails"
import Studentlogin from "./pages/Studentlogin";
import Addclass from "./pages/Addclassdetails";


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
                   <Route exact path ="/teacher/batch/alldetails" component={Completebatchdetails} />
                   <Route path ="/*" component={Homepage} />
            </Switch>
          </div>
  </Router>;



export default App;
