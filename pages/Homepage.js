import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Homepage extends Component {

      render()
      {
         return (
         <div className = "frontpage">
                <Header />
                <div className="card-deck" id="content">
                      <div className="card mb-4">
                            <div className="card-body">
                                <h4 className="card-title">Teachers</h4>
                                <p className="card-text">Easy class management solution for independant teacher.</p>
                                <Link to ="/teacher/tmain" className="mainlink">Teachers login</Link><br />
                              
                            </div>
                        </div>
                        <div className="card mb-4">
                            <div className="card-body">
                                <h4 className="card-title">Students</h4>
                                <p className="card-text">Check your Attendance , Home work</p>
                                <Link to ="/other/students/loginpg" className="mainlink">Student Login</Link><br />
                            </div>
                        </div>
                        <div className="card mb-4">
                            <div className="card-body">
                                <h4 className="card-title">Visitors</h4>
                                <p className="card-text">Achievements and Performances</p>
                                <Link to ="/other/users" className="mainlink">Visitors</Link>
                            </div>
                        </div>
                    </div>
                    <Footer />
           </div>
         );
      }
}

export default Homepage;

// render()
// {
//    return (
//    <div className = "frontpage">
//           <Header />
//           <div className="card-deck">
//                 <div className="card mb-4">
//                       <div className="view overlay">
//                           <img className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/14.jpg" alt="Card image cap"/>
//                           <a href="#!">
//                               <div className="mask rgba-white-slight"></div>
//                           </a>
//                       </div>
//                       <div className="card-body">
//                           <h4 className="card-title">Teachers</h4>
//                           <p className="card-text">Easy class management solution for independant teacher.</p>
//                           <button type="button" className="btn btn-light-blue btn-md"> <Link to ="/teacher/tmain" className="mainlink">Teachers login</Link></button><br />
//                           <button type="button" className="btn btn-light-blue btn-md"> <Link to ="/teacher/tmain" className="mainlink">Teachers login</Link></button>
//                       </div>
//                   </div>
//                   <div className="card mb-4">
//                       <div className="view overlay">
//                           <img className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/14.jpg" alt="Card image cap"/>
//                           <a href="#!">
//                               <div className="mask rgba-white-slight"></div>
//                           </a>
//                       </div>
//                       <div className="card-body">
//                           <h4 className="card-title">Students</h4>
//                           <p className="card-text">Check your Attendance , Home work</p>
//                           <button type="button" className="btn btn-light-blue btn-md">  <Link to ="/other/students/loginpg" className="mainlink">Student Login</Link><br /></button>
//                       </div>
//                   </div>
//                   <div className="card mb-4">
//                       <div className="view overlay">
//                           <img className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/15.jpg" alt="Card image cap"/>
//                           <a href="#!">
//                               <div className="mask rgba-white-slight"></div>
//                           </a>
//                       </div>
//                       <div className="card-body">
//                           <h4 className="card-title">Visitors</h4>
//                           <p className="card-text">Look for Teachers</p>
//                           <button type="button" className="btn btn-light-blue btn-md">  <Link to ="/other/users" className="mainlink">Visitors</Link><br /></button>
//                       </div>
//                   </div>
//               </div>
//      </div>
//    );
// }
