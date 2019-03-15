import React, { Component } from 'react';
import axios from 'axios';


class BatchRecAddclass extends Component
{
                state = {
                       date: '',
                 
                       lessoncovered:'',
                       homework: '',
                       updatestatus: '',
               }; // end
       

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

   
       

        saveClassDetails = (event) =>
        {
                event.preventDefault();
                console.log("Save class details",this.state.lessoncovered,this.state.homework);
                if ( this.state.lessoncovered === '' || this.state.homework === '' ||this.state.date === '')
                {
                  this.setState({updatestatus: "Empty Fields not accepted!!!!!!"},
                               ()=>{console.log("Empty Fields not expected");});
                }
                else
                {
                  axios.post('/api/teacher/batch/class/add',
                  {
                     lessoncovered : this.state.lessoncovered,
                     homework : this.state.homework,
                     batch: this.props.batchdet.bid,
                     classdate: this.state.date
                  })
                  .then((response) =>
                    {
                      console.log("The Response from saving class details",response.data);
                      this.props.newClassDetails({lessoncov:response.data.lessoncovered,
                            homework: response.data.homework,
                            cldate: response.data.classdate});
                      this.setState({ lessoncovered : '',
                                        homework: '',
                                        date: '',
                                        updatestatus: ''
                                      });
                    }) //end then
                    .catch( error => {
                      this.setState({updatestatus: 'Error in updating class details'+error},
                            () =>{
                                console.log("Error in saving class records!!!",error);
                            });
                    }); // end catch
                }
        } // end saveClassDetails

         
      render()
      {
          return( <form>
                  <h5 className="errmsg">{this.state.updatestatus}</h5>
                  <div className = "input-group">
                      <div className="input-group-prepend">
                        <span className= "input-group-text">Lesson Covered </span>
                      </div>
                      <input type = "text"   value={this.state.lessoncovered} onChange = {this.handleInputChange} name = "lessoncovered"  id = "lessoncovered" placeholder="Lesson Covered" required />
                  </div>
                  <div className = "input-group">
                    <div className = "input-group-prepend">
                      <span className = "input-group-text">Homework </span>
                    </div>  
                      <input type = "text"   value={this.state.homework} onChange = {this.handleInputChange} name = "homework" id = "homework" placeholder = "Homework assigned" required/>
                  </div>
                  <div className = "input-group">
                    <div className = "input-group-prepend">
                      <span className="input-group-text">Date: </span>
                    </div>  
                      <input type = "date"   value={this.state.date} onChange = {this.handleInputChange} name = "date" placeholder = "mm/dd/yyyy" id = "date" required/>
                  </div>
                  <button className = "rowbtn"
                          onClick = {this.saveClassDetails}>
                          <i className="fa fa-plus-circle"></i>
                          Add Class Info
                  </button>
                  </form>
                   ) //end return
      } // end render
} // end component

export default BatchRecAddclass;
