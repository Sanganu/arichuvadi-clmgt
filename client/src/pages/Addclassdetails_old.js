import React, { Component } from 'react';
import axios from 'axios';
import Classentry from './Classentry';
import Teacherheader from '../components/Teacherheader';

class Addclass extends Component
{

        constructor(props)
        {
                super(props);
                this.state = {
                       addcldetails : true,
                       invalid:'',
                       batchid:'',
                       batchrecords :[],
                       canenter: false,
                       invalid:false,
                       currentbatch: {},
                       cbid :'',
                       cbdesc : '',
                       cbsubj : '',
                       cblevel : '',
                       cbrate : '',
                       classdetentry : false
               }; // end state
         } ;// end constructor

        handleInputChange = (event) => {
              const target = event.target;
              const value = target.value;
              const name  = target.name;
              this.setState({
                 [name]: value
               } /*,
               () =>{
                 console.log('Set State in Main Section',value,name);
               } */);
        }; //End handle Input change

        componentDidMount = () => {
          this.setState({ classdetentry : true,
            cbid: this.props.bid,
            cbdesc: this.props.bdesc,
            cbsubj: this.props.bsubj,
            cblevel: this.props.blevel,
            cbrate: this.props.brate }, () => {  console.log("Entry in class details---",this.state.classdetentry);});
        }
        saveClassDetails = (event) =>
        {
                event.preventDefault();
                console.log("Save class details",this.state.lessoncovered,this.state.homework,this.state.cbid);
                axios.post('/api/teacher/batch/class/add',
                            {
                               lessoncovered : this.state.lessoncovered,
                               homework : this.state.homework,
                               batch: this.state.cbid,

                            })
                    .then(response =>
                      {
                         console.log("Class details updated")
                          this.setState({classdetentry : false}, () => { console.log("Class details update")});
                      }) //end then
                      .catch( error => {
                        this.setState({errmsg : "Error in saving class records"+error},
                              () =>{
                                   console.log("Error in saving class records!!!",error);
                              });
                      }); // end catch
          } // end

          addClassInfo = () =>
          {
               this.setState({ classdetentry : true,
                 cbid: this.props.bid,
                 cbdesc: this.props.bdesc,
                 cbsubj: this.props.bsubj,
                 cblevel: this.props.blevel,
                 cbrate: this.props.brate }, () => {  console.log("Entry in class details---",this.state.classdetentry);})
          }

      render()
      {

          return(<div>
                            <button className = "addclass"
                                onClick = {this.addClassInfo}>Add Class Details
                            </button>
                              {this.state.classdetentry ?
                              <div>
                                               <h5 className = "subcr"></h5>
                                               <p className="errmsg">{this.state.errmsg}</p>
                                                 <form className = "form-horizontal" id= "classform">
                                                            <div className = "form-group">
                                                               <label className ="inline">Lesson covered :</label>
                                                               <input type = "text"   value={this.state.lessoncovered} onChange = {this.handleInputChange} name = "lessoncovered" /><br />
                                                             </div>
                                                             <div className = "form-group">
                                                                <label className ="inline">Homework Assigned :</label>
                                                                <input type = "text"   value={this.state.homework} onChange = {this.handleInputChange} name = "homework" /><br />
                                                              </div>
                                                              <div className = "form-group">
                                                                 <label className ="inline">Attendance :</label>
                                                                 <input type = "text"   value={this.state.attendance} onChange = {this.handleInputChange} name = "attendance" /><br />
                                                               </div>
                                                             <button className = "btn btn-info"  name = "clcreation" onClick = {this.saveClassDetails}>Save Details</button>
                                                </form>
                              </div>
                        : <div></div> }


                 </div>) // e nd return
      }
}

export default Addclass;
