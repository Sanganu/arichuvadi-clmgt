import React, { Component } from 'react';
import Createbatch from './Createbatch';
// import Addstudent from './Addstudent';
import BatchInfo from './BatchInfo';

class Batchmain extends Component {
  state = {
    batchdet: '',
    displaybatch: this.props.dbatch || true
  }

  handleBatchCreated = (batchnew) => {
    //event.preventDefault();
    const batchdet = batchnew;
    console.log("batch details cprops received after create batch - batchmain", batchdet);

    this.setState({
      batchdet: batchdet,
    },
      () => {
        this.setState({ displaybatch: false })
        console.log('Setstate callback-batchmain', this.state.batchdet);
      }); //    end thistate
  }; // end handlebatchcreated    


  render() {
  return(<div>
        
            {this.state.displaybatch ? <Createbatch
              onInsert={this.handleBatchCreated} />
              : <BatchInfo batchdetails={this.state.batchdet}
                newbatch={true} />}
          </div>
        ) // end return
  }// end render

} // end class Batchmain

export default Batchmain;
