import React, { Component } from 'react';

class BatchInfo extends Component {

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

    render()
    {
        return(<div>
            <div>
                  <h4>Batch :</h4>
            </div>
        </div>)
    } 
}

export default BatchInfo;
