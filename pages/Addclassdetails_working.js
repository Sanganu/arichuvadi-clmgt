import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

//import Classentry from './Classentry';
//import Teacherheader from '../components/Teacherheader';

class BatchRecAddclass extends Component
{
       const customStyle = {
             content: {
               top:'50%',
               left:'50%',
               right:'auto',
               bottom:'auto',
               marginRight:'-50%',
               transform: 'translate(-50%,-50%)'
             }
       };
        constructor(props)
        {
                super(props);
                this.state = {
                       addcldetails : true,
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
                       classdetentry : false,
                       studentsid: [],
                       classdate: '',
                       modalIsOpen: false
               }; // end
         } ;// end constructor

        openModal() {
          this.setState({modalIsOpen:true});
        }
        closeModal(){
          this.setState({modalIsOpen:false});
        }
        handleInputChange = (event) => {
              const target = event.target;
              const value =  target.value; //target.type === 'checkbox' ? target.checked :
              const name  = target.name;
              if ( target.type === 'checkbox')
              {
                    let studentsidlist = this.state.studentsid;
                    studentsidlist.push(value);
                    this.setState({
                      studentsid : studentsidlist
                    }, () => { console.log("Setting students record");});
              }
              else {
                this.setState({
                   [name]: value
                 } );
              }
        }; //End handle Input change

        componentWillReceiveProps = () => {
          console.log("Props",this.props);
          console.log("student",this.props.studentdet)
        }

        saveClassDetails = (event) =>
        {
                event.preventDefault();
                console.log("Save class details",this.state.lessoncovered,this.state.homework,this.state.cbid,this.state.studentsid);
                axios.post('/api/teacher/batch/class/add',
                            {
                               lessoncovered : this.state.lessoncovered,
                               homework : this.state.homework,
                               batch: this.state.cbid,
                               students: this.state.studentsid,
                               classdate: this.state.classdate
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
               console.log("In add class info - addclassdetails.js",this.props.recstudents);
               this.setState({ classdetentry : true,
                 cbid: this.props.bid,
                 cbdesc: this.props.bdesc,
                 cbsubj: this.props.bsubj,
                 cblevel: this.props.blevel,
                 cbrate: this.props.brate,
                strecords: this.props.studentdet }, () => {  console.log("Entry in class details---",this.state.classdetentry);});
          }

      render()
      {

         const onespace = " ";
          return(<tr>
                   <tr>
                                      <td>{this.props.bid}</td>
                                      <td>{this.props.bdesc}</td>
                                      <td>{this.props.bsubj}</td>
                                      <td>{this.props.brate}</td>
                                      <td><button className = "addclass"
                                                onClick = {this.addClassInfo}>Class Details
                                          </button></td>
                      </tr>
                       {this.state.classdetentry ?
                         <tr>
                                             <td><input type = "text"   value={this.state.lessoncovered} onChange = {this.handleInputChange} name = "lessoncovered" placeholder="Lesson Covered" /><br /></td>
                                             <td><input type = "text"   value={this.state.homework} onChange = {this.handleInputChange} name = "homework" placeholder = "Homework assigned"/><br /></td>
                                             <td><input type = "text"   value={this.state.classdate} onChange = {this.handleInputChange} name = "classdate" placeholder ="Class Date"/><br /></td>
                                             {this.state.strecords.map((data,index) =>
                                               <td><input type="checkbox" key={index} value={data._id} onChange = {this.handleInputChange} />{data.studentfname}{data.studentlname}</td>
                                             )}
                                             <td><button className = "btn btn-info"  name = "clcreation" onClick = {this.saveClassDetails}>Save Details</button></td>
                        </tr>
                        : <tr></tr> }

       } // end render
} // end component

export default BatchRecAddclass;

// <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
//   <div className="modal-dialog modal-dialog-centered" role="document">
//     <div className="modal-content">
//             <div className="modal-header">
//                   <h5 className="modal-title" id="exampleModalLongTitle">{this.state.cbdesc} -- Class Details</h5>
//                     <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//                       <span aria-hidden="true">&times;</span>
//                     </button>
//             </div>
//             <div className="modal-body">
//                           <input type = "text"   value={this.state.lessoncovered} onChange = {this.handleInputChange} name = "lessoncovered" placeholder="Lesson Covered"/><br />
//                           <input type = "text"   value={this.state.homework} onChange = {this.handleInputChange} name = "homework" placeholder = "Homework assigned"/><br />
//                           <input type = "text"   value={this.state.classdate} onChange = {this.handleInputChange} name = "classdate" placeholder ="Class Date"/><br />
//                           {this.state.strecords.map((data,index) =>
//                             <p><input type="checkbox" key={index} value={data._id} onChange = {this.handleInputChange}/>{data.studentfname}{onespace}{data.studentlname}</p>
//                           )}
//             </div>
//             <div className ="modal-footer">
//               <button type="button" className ="btn btn-secondary" data-dismiss="modal">Close</button>
//               <button type="button" className ="btn btn-primary" name = "clcreation" onClick = {this.saveClassDetails}>Save changes</button>
//             </div>
//     </div> // end modal content
//   </div> // end mondel dialog
// </div> //end modal fade
// render()
// {
//
//     return(<tr>
//              <tr>
//                                 <td>{this.props.bid}</td>
//                                 <td>{this.props.bdesc}</td>
//                                 <td>{this.props.bsubj}</td>
//                                 <td>{this.props.brate}</td>
 //                                           onClick = {this.addClassInfo}>Class Details
//                                     </button></td>
//                 </tr>
//                  {this.state.classdetentry ?
//                                  <tr>
//                                          <td><input type = "text"   value={this.state.lessoncovered} onChange = {this.handleInputChange} name = "lessoncovered" placeholder="Lesson Covered" /><br /></td>
//                                          <td><input type = "text"   value={this.state.homework} onChange = {this.handleInputChange} name = "homework" placeholder = "Homework assigned"/><br /></td>
//                                          <td><input type = "text"   value={this.state.classdate} onChange = {this.handleInputChange} name = "classdate" placeholder ="Class Date"/><br /></td>
//                                          {this.state.strecords.map((data,index) =>
//                                            <td><input type="checkbox" key={index} value={data._id} onChange = {this.handleInputChange} />{data.studentfname}{data.studentlname}</td>
//                                          )}
//                                          <td><button className = "btn btn-info"  name = "clcreation" onClick = {this.saveClassDetails}>Save Details</button></td>
//                                 </tr>
//                   : <tr></tr> }
//            </tr>) // end return
//  } // end render
