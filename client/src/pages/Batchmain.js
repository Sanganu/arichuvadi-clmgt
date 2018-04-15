 import React, { Component } from 'react';
import Createbatch from './Createbatch';
import Addstudent from './Addstudent';

class Batchmain extends Component {
      constructor(props) {
          super(props);
          this.state = {
          batchdet : '',
          displaybatch : true
          }
      };

      handleBatchCreated = (batchnew) => {
        //event.preventDefault();
        const batchdet = batchnew;
        console.log("batch details cprops received after create batch - batchmain",batchdet);

        this.setState({
            batchdet : batchdet,
          },
            () => {
              this.setState({  displaybatch:false})
              console.log('Setstate callback-batchmain',this.state.batchdet);
            }); //end this state
      }; // end handlebatchcreated


      render() {

        const  brecords =this.state.batchdet;
        return(<div>
               {this.state.displaybatch ? <Createbatch
                                         onInsert={this.handleBatchCreated} />
                         : <Addstudent batchdet = {brecords}
                                       onchange = {this.handleStudentAdded} />}
              </div>) // end return
      }// end render

} // end class Batchmain

export default Batchmain;
