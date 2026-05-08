import React, { Component, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import axios from 'axios';

import { loginCredentials, authBootstrapped } from "./reduxAction/dispatchLoginCredentials";
//Critical components needed as soon as page loads
import Appheader from "./components/Appheader";
import Iconbar from "./navigation/Iconbar";
import Footer from "./components/Stfooter";
import ErrorBoundary from "./errorHandlers/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";
import Loading from "./components/Loading";

//Loading initial login pages for first paint
import Homepage from "./pages/general/Homepage";
import Boardmember from "./pages/board/Boardmember";
import Studentlogin from "./pages/student/Studentlogin";
import "./bootstrap.css";

// LAzy loading

const Allbatches = lazy(() => import("./pages/batch/Displayallbatchdetails"));
const Search = lazy(() => import("./pages/general/Search"));
const Alumni = lazy(() => import("./pages/general/Alumni"));
const Updateteacher = lazy(() => import("./pages/instructor/Updateinstructor"));
const Instructormanagement = lazy(() => import("./pages/instructor/Instructormanagement"));
const StudentManagement = lazy(() => import('./pages/student/StudentManagement'));
const NewStudentReg = lazy(() => import("./pages/student/NewStudentregistration"));
const Addstudent = lazy(() => import("./pages/student/Addstudent"));
const Createbatch = lazy(() => import("./pages/batch/Createbatch"));
const Addclass = lazy(() => import("./pages/batch/Addclassdetails"));
const Ourteam = lazy(() => import("../src/pages/general/Ourteam"));

// import Resources from "./pages/Resources";




class App extends Component {
  componentDidMount() {
    this.bootstrapAuth()
  }
  bootstrapAuth = () => {
    const authProbe = axios.create({
      withCredentials: true,
      validateStatus: (status) => status < 500
    });

    authProbe.get('/api/board/me')
      .then((res) => {
        if (res.status !== 200) {
          return authProbe.get('/api/student/me');
        }

        this.props.setCredentials({
          loginemail: res.data.loginemail || '',
          userid: res.data.id || '',
          userfname: res.data.name || '',
          userlname: '',
          usertype: 'management',
          invalid: false
        });
        return null;
      }).then((reply) => {
        if (!reply) return;

        if (reply.status !== 200) {
          this.props.markBootstrapped();
          return;
        }

        console.log("RESPONSE - auth stu/boar", reply);
        this.props.setCredentials({
          loginemail: reply.data.loginemail || '',
          userid: reply.data.id || reply.data._id || '',
          userfname: reply.data.studentfname || reply.data.fname || reply.data.name || '',
          userlname: reply.data.studentlname || reply.data.lname || '',
          usertype: reply.data.role || '',
          invalid: false
        });
      }).catch(() => {
        this.props.markBootstrapped();
      })
  }
  render() {
    const { bootstrapped } = this.props;
    return (
      <Router>
        <div>
          <Appheader />
          <div className='row'>
            <div className='col-sm-2 col-md-2  col-lg-2'>
              <Iconbar />
            </div>

            <div className="col-sm-10 col-md-10 col-lg-10">
              {!bootstrapped ? (
                <Loading testid="auth-bootstrapping" />
              ) : (
                <Suspense fallback={<Loading testid="route-loading" />}>
                <Switch>
                  {/* ====== PUBLIC routes  ====== */}
                  <Route exact path="/" component={Homepage} />
                  <Route exact path="/board/login" component={Boardmember} />
                  <Route exact path="/student/loginpg" component={Studentlogin} />
                  <Route exact path="/student/newstudent" component={NewStudentReg} />
                  <Route exact path="/ourteam" component={Ourteam} />
                  <Route exact path="/alumni" component={Alumni} />

                  {/* ====== AUTHENTICATED + LAZY routes ======
                    ErrorBoundary → Suspense → ProtectedRoute → Page
                    Order matters: boundary outside Suspense so chunk-load
                    failures are caught and reported instead of white-screening.
                */}
                  <Route
                    render={() => (
                      <ErrorBoundary scope="lazy-routes">
                        <Suspense fallback={<Loading testid="route-loading" />}>
                          <Switch>
                            {/* ----- Admin (Board Member) ----- */}
                            {/* <ProtectedRoute
                                    role="management"
                                    exact
                                    path="/board/dashboard"
                                    component={Dashboard}
                                  /> */}
                            <ProtectedRoute
                              role="management"
                              exact
                              path="/board/createbatch"
                              component={Createbatch}
                            />
                            <ProtectedRoute
                              role="management"
                              exact
                              path="/board/allbatch/:displayall"
                              render={(p) => <Allbatches key={p.location.key} {...p} displayall="true" />}
                            />
                            <ProtectedRoute
                              role="management"
                              exact
                              path="/board/addTeacher"
                              component={Instructormanagement}
                            />
                            <ProtectedRoute
                              role="management"
                              exact
                              path="/board/searchrecords"
                              component={Search}
                            />
                            <ProtectedRoute
                              role="management"
                              exact
                              path="/board/batch/addstudent/:batchid"
                              component={Addstudent}
                            />
                            <ProtectedRoute
                              role="management"
                              exact
                              path="/board/profile/update"
                              component={Updateteacher}
                            />
                            <ProtectedRoute
                              role="management"
                              exact
                              path="/teacher/batch/addclass"
                              component={Addclass}
                            />

                            {/* ----- Student ----- */}
                            <ProtectedRoute
                              role="student"
                              exact
                              path="/student/studentmanagement"
                              component={StudentManagement}
                            />

                            {/* Fallback for any unknown path */}
                            <Route path="*" component={Homepage} />
                          </Switch>
                        </Suspense>
                      </ErrorBoundary>
                    )}
                  />
                </Switch>
                </Suspense>
              )}
            </div>

          </div>

          <Footer />
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => ({
  bootstrapped: state.bootstrapped,
});

const mapDispatchToProps = (dispatch) => ({
  setCredentials: (cred) => dispatch(loginCredentials(cred)),
  markBootstrapped: () => dispatch(authBootstrapped()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
