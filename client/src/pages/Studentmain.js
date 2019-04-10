 import React, { Component } from 'react';
 import Allclasses from './displayallclassdetails';

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
    componentDidMount = () => {
          console.log("props received",this.props);
     }

      render()
      {
           return(<div>
                     <div>
                        <h3>Welcome {this.props.studentdet.fname}    {this.props.studentdet.lname} </h3>
                      </div>
                      <div className = "row">
                         <div className = "col-lg-6">
                         </div>
                         <div className = "col-lg-6">
                                          <form>
                                                <div className ="form-group">
                                                      <input className = "form-control"
                                                            onChange={this.handleInputChange}
                                                            type="text"
                                                            name="stfname"
                                                            id="stfname"
                                                            value={this.state.stfname} />
                                                      <label className="form-control-placeholder">
                                                            </label> 
                                                </div>
                                                <div className ="form-group">
                                                      <input className = "form-control"
                                                            onChange={this.handleInputChange}
                                                            type="text"
                                                            name="stlname"
                                                            id="stlname"
                                                            value={this.state.stlname} />
                                                      <label className="form-control-placeholder">
                                                            </label> 
                                                </div>
                                                <div className ="form-group">
                                                      <input className = "form-control"
                                                            onChange={this.handleInputChange}
                                                            type="text"
                                                            name="parent"
                                                            id="parent"
                                                            value={this.state.parent} />
                                                      <label className="form-control-placeholder">
                                                            </label> 
                                                </div>
                                                <div className ="form-group">
                                                      <input className = "form-control"
                                                            onChange={this.handleInputChange}
                                                            type="number"
                                                            name="parentphonenumber"
                                                            id="parentphonenumber"
                                                            value={this.state.parentphonenumber} />
                                                      <label  className="form-control-placeholder">
                                                            </label> 
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
                                                            </label> 
                                                </div>
                                          </form>
                                       </div>
                                    </div>
                              <div className = "row">            
                             <table>
                             <tbody>
                              <Allclasses classrecords = {this.props.classrecords}/> 
                             </tbody> 
                            </table>
                            </div>
                 </div>)
      }
}

export default Studentmain;
