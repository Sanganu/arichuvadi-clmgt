import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
// import {Link} from 'react-router-dom';

//import Classentry from './Classentry';
//import Teacherheader from '../components/Teacherheader';
const customStyle = {
      content: {
        top:'50%',
        left:'50%',
        right:'auto',
        bottom:'auto',
        marginRight:'-50%',
        transform: 'translate(-50%,-50%)',
        color:  'hsla(360, 100%, 8%, 1)'
      }
};

class BatchRecAddclass extends Component
{

        constructor(props)
        {
                super(props);
                this.state = {
                       cbid :'',
                       cbdesc : '',
                       cbsubj : '',
                       cblevel : '',
                       cbrate : '',
                       studentsid: [],
                       classdate: '',
                       modalIsOpen: false,
                       strecords: [],
                       lessoncovered:'',
                       homework: '',
                       updatestatus: ''
               }; // end
         } ;// end constructor


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
                          this.setState({ classdetentry : false,
                                          updatestatus :'Class details updated',
                                          lessoncovered : '',
                                          homework: ''
                                        } ,
                                   () => { console.log("Class details updated batch and class table") }  );
                      }) //end then
                      .catch( error => {
                        this.setState({errmsg : "Error in saving class records"+error,updatestatus: 'Error in updating class details'+error},
                              () =>{
                                   console.log("Error in saving class records!!!",error);
                              });
                      }); // end catch
          } // end saveClassDetails

          addClassInfo = () =>
          {
                 this.setState({
                 cbid: this.props.bid,
                 cbdesc: this.props.bdesc,
                 cbsubj: this.props.bsubj,
                 cblevel: this.props.blevel,
                 cbrate: this.props.brate,
                 modalIsOpen:true,
                strecords: this.props.studentdet }, () => {  console.log("Entry in class details---",this.props);});
          } // end addClassInfo

          deleteBatch = () => {
            axios.delete('/api/teacher/batch/delete',
                        {
                          batchid:this.props.bid
                        })
                .then(response =>
                  {
                     console.log("Batch details / Class details /Student details deleted")
                  }) //end then
                  .catch( error => {
                               console.log("Error in deleting batch student class records!!!",error);

                  }); // end catch
          }

          

      render()
      {


          return(<tr onClick = {this.props.getBatchDetails}>
                                      <td>{this.props.bdesc}</td>
                                      <td>{this.props.bsubj}</td>
                                      <td>{this.props.brate}</td>
                                      
                </tr>) //end return
      } // end render
} // end component

export default BatchRecAddclass;
