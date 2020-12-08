 import React, { Component } from 'react';
 import Allrecords from '../general/displayrecords';
 import axios from 'axios';

class Studentmain extends Component
{
    state = {
      stfname:this.props.studentdet.fname ||'',
      stlname:  this.props.studentdet.lname|| '',
      // stbatchid:'',
      stdid: this.props.studentdet._id || '',
      parent: this.props.studentdet.parent || '',
      parentphonenumber: this.props.studentdet.phone || '',
      email: this.props.studentdet.email || '',
      batchdescription: this.props.studentdet.batch || '',
      course: this.props.studentdet.course || '',
      level: this.props.studentdet.level || '',
      rate: this.props.studentdet.rate || ''
     }

    handleInputChange = (event) => {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      //console.log('The Value in input change',value,name);

      this.setState({
          [name]: value
      });
     };

     logoutapp = () => {
      axios.post("/auth/logout")
      .then((response)=> {
        console.log("Response from logout",response);
        window.location = "/";
      }).catch((error) =>{
         console.log("Error in logging out",error);
         alert("Error in loggin out");
      });
     }    

    componentDidMount = () => {
          console.log("Class Records",this.props.classrecords);
          console.log("Student Records",this.props.studentdet);
     }

      render()
      {
      const classrecords = this.props.classrecords;
           return(<div className = "middlecontent">
                     <div>
                        <h3>Welcome {this.props.studentdet.fname}    {this.props.studentdet.lname} </h3>
                      </div>
                      <div className = "row">
                         <div className = "col-lg-6">
                                    <div className ="form-group">
                                          <input className = "form-control"
                                                 type="text"
                                                 readOnly
                                                 value={this.props.studentdet.batch} />
                                          <label className="form-control-placeholder">
                                              Batch  </label> 
                                    </div>
                                    <div className ="form-group">
                                          <input className = "form-control"
                                                 type="text"
                                                 readOnly
                                                 value={this.props.studentdet.level} />
                                          <label className="form-control-placeholder">
                                             Course  </label> 
                                    </div>
                                    <div className ="form-group">
                                          <input className = "form-control"
                                                 type="text"
                                                 readOnly
                                                 value={this.props.studentdet.teacher} />
                                          <label className="form-control-placeholder">
                                            Teacher  </label> 
                                    </div>
                                    <button onClick = {this.logoutapp}>Logout</button>
                         </div>
                         <div className = "col-lg-6">
                                         
                                                <div className ="form-group">
                                                      <input className = "form-control"
                                                            type="text"
                                                            readOnly
                                                            value={this.state.stfname} />
                                                      <label className="form-control-placeholder">
                                                        Firstname    </label> 
                                                </div>
                                                <div className ="form-group">
                                                      <input className = "form-control"
                                                            onChange={this.handleInputChange}
                                                            type="text"
                                                            name="stlname"
                                                            id="stlname"
                                                            value={this.state.stlname} />
                                                      <label className="form-control-placeholder">
                                                        Lastname    </label> 
                                                </div>
                                                <div className ="form-group">
                                                      <input className = "form-control"
                                                            onChange={this.handleInputChange}
                                                            type="text"
                                                            name="parent"
                                                            id="parent"
                                                            value={this.state.parent} />
                                                      <label className="form-control-placeholder">
                                                       Parent     </label> 
                                                </div>
                                                <div className ="form-group">
                                                      <input className = "form-control"
                                                            onChange={this.handleInputChange}
                                                            type="number"
                                                            name="parentphonenumber"
                                                            id="parentphonenumber"
                                                            value={this.state.parentphonenumber} />
                                                      <label  className="form-control-placeholder">
                                                      Telephone      </label> 
                                                </div>
                                                <div className ="form-group">
                                                      <input className = "form-control"
                                                            onChange={this.handleInputChange}
                                                            type="text"
                                                            name="email"
                                                            id="email"
                                                            readOnly
                                                             value={this.state.email} />
                                                      <label className="form-control-placeholder">
                                                       Username     </label> 
                                                </div>
                                      </div>
                            </div>  
                              {classrecords ?
                              <table>
                                    <thead>
                                    <tr>
                                          <th>Lessons Covered</th>
                                          <th></th>
                                          <th>Homework Assigned</th>
                                          <th></th>
                                          <th>Class date</th>
                                     </tr>
                                     </thead>
                                     <tbody>
                                           
                                     {classrecords.map((data,index) => (
                                           <Allrecords
                                               key ={index}
                                               field1 = {data.lessoncovered}
                                               field2 = {data.homework}
                                               field3 = {data.classdate} />)
                                     )}
                                     </tbody>
                              </table>
                               : <div className="card">
                                   <h4 className="card-title">Class details does not exist</h4>
                                   <p className="card-body">Please contact Board members or Instructor for further details</p>
                                 </div>}
                 </div>)
      }
}

export default Studentmain;
