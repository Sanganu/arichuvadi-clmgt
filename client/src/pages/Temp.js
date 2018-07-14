
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

      