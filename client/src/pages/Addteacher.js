import React,{ Component } from 'react';
import axios from  'axios';

class Addteacher extends Component{
        state = {
            firstname : "",
            lastname : "",
            title : "Teacher",
            email : "",
            errmsg:"",
            phone:""
        }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name  = target.name;
        this.setState({
            [name] : value
        },() => {
           console.log('The Value in input change',value,name);
        });
        
    }
 
    handleTeacherAccountCreation = (event) => {
                        event.preventDefault();
                        console.log("In Teacher Account Creation state values",this.state);
                        //var myDate = new Date(this.state.startdate);
                        if(  this.state.firstname === "" ||
                            this.state.lastname === "" ||
                            this.state.title === "" ||
                            this.state.email === "")
                            {
                            console.log("No Empty Fields Enter valid data");
                            this.setState({errmsg : "No Empty Fields Enter valid data"});
                            }
                        else {
                        axios.post('/api/teacher/new',
                                {
                                    fname:this.state.firstname,
                                    lname:this.state.lastname,
                                    email:this.state.email,
                                    title:this.state.title,
                                    phone:this.state.phone
                                })
                            .then(response =>
                                {
                                    console.log("The response createe Teacher Account",response);
                                    console.log("The  inserted teacher ID",response.data._id);
         
                             })
                            .catch(error => {
                                    this.setState({errmsg: error.errstring +" Please check console for further details"},() =>
                                    {
                                        console.log("Error in Adding Teacher details",error.err);
                                    });

                            }); //end new batch creation - axios call
                        } //end if
     };  // end handleclasscreation

     render(){
            return(<div>
     
     <div className="middlecontent">
             
             <div className="col-lg-8 col-sm-8">
                 <form className="inputsection">
                     <h5 className="subcr">New Teacher / Admin</h5>
                     <p className="errmsg">{this.state.errmsg}</p>

                     <div className="form-group row">
                         <label className="has-float-label">First Name </label>
                         <input type="text"
                             className="form-control"
                             id="firstname"
                             value={this.state.firstname}
                             onChange={this.handleInputChange}
                             name="firstname" />
                     </div>
                     <div className="form-group row">
                         <label className="has-float-label">Last Name </label>
                         <input type="text"
                             className="form-control"
                             id="firstname"
                             value={this.state.lastname}
                             onChange={this.handleInputChange}
                             name="lastname" />
                     </div>
                     <div className="form-group row">
                         <label className="has-float-label">phone </label>
                         <input type="text"
                             className="form-control"
                             id="phone"
                             value={this.state.phone}
                             onChange={this.handleInputChange}
                             name="phone" />
                     </div>
                     <div className="form-group row">
                         <label forhtml="title"></label>
                         <select className="form-control droplist"
                             onChange={this.handleInputChange}
                             value={this.state.title} 
                             name="title"
                              id="title">
                             <option value='Teacher' default>Teacher</option>
                             <option value='Director'>Director</option>
                             <option value='Founder'>Founder</option>
                         </select>
                     </div>
                     <div className="form-group row">
                         <label forhtml="email">Email</label>
                         <input className="form-control droplist"
                          value={this.state.email} 
                          onChange={this.handleInputChange} 
                          type = "text"
                          name="email"
                          id="email" />
                       </div>
                    
                     <button className="createteacher"
                      name="clcreation" 
                      onClick={this.handleBatchCreation}>
                      Add Teacher</button>
                 </form>
             </div>
           </div>

            </div> );
     }
}
export default Addteacher;
