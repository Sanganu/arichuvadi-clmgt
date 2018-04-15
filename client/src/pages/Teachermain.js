import React, { Component } from 'react';
import Allbatches from './displayallbatchdetails';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Teachermain extends Component
{
         constructor(props)
         {
           super(props);
           this.state = {
            canenter : '',
            invalid:'',
            vemail:'',
            vpword:'',
            logindisp : true
             };
         }

         handleInputChange = (event) => {
               const target = event.target;
               const value = target.value;
               const name  = target.name;
               //console.log('The Value in input change',value,name);

               this.setState({
                  [name]: value
                });
         };


         logincheck = (event) => {
               event.preventDefault();
               console.log("Use myemail@yahoo.com and welcome to enter site ");
               console.log(this.state.vemail, this.state.vpword);

               if (this.state.vemail === "myemail@yahoo.com" &&
                   this.state.vpword === "welcome")
                   {
                      console.log('if valid');
                    // window.location = '/teacher/batchmain/';
                     this.setState ({
                          canenter: true,
                          invalid:false,
                          logindisp: false
                     })
                   }
                else {

                    this.setState({invalid : true});
                }
         }


          render()
          {
                  return( <div >

                         {this.state.logindisp ?
                             <div>
                                         <Header />
                                         <div className = "tloginsection container">
                                             <div className = "row">
                                                  <div className = "col-sm-6">
                                                      <form className="inputsection">
                                                                    <h3 id="tlogin">Teacher Login</h3>
                                                                     <div className = "form-group row">
                                                                          <label forhtml = "vemail" id ="lemail">Email Addess  </label><br />
                                                                          <input className="textarea" onChange  = {this.handleInputChange} type="text" name="vemail" id="vemail" value={this.state.vemai} /><br />
                                                                      </div>
                                                                      <div className = "form-group row">
                                                                          <label forhtml = "vpword" id = "lpsword">Password  </label><br />
                                                                          <input className="textarea" onChange = {this.handleInputChange} type="password" name="vpword" id ="vpword" value ={this.state.vpword} /><br />
                                                                      </div>
                                                                     <br />
                                                                       <p>Hint: (email:myemail@yahoo.com  password:welcome)</p>
                                                                       <button className ="btn btn-lg btn-info" id = "blogin" onClick={this.logincheck}>Login</button>
                                                       </form>
                                                    </div>
                                                    <div className = "col-sm-6">
                                                          <img id = "timg" src = {require("./teacherquote.jpg")} alt="teachers teach from heart"  className="img-responsive" />
                                                    </div>
                                               </div>
                                          </div>
                                  </div>
                          : <div></div>}
                              {this.state.canenter ? <Allbatches /> : <div></div>}
                              {this.state.invalid ? <div>
                                                         <h6 className ="errmsg">Invalid Credentials - Please use right credentials</h6>
                                                      </div>: <div></div>}

                          <Footer />
                         </div>
                  ) ; //end return
          } //end render

} //end class Teacher Main

export default Teachermain;
