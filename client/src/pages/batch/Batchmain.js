import React, { Component } from 'react';
import Createbatch from './Createbatch';
// import Addstudent from './Addstudent';
import BatchInfo from './BatchInfo';

class Batchmain extends Component {
  state = {
    batchdet: '',
    displayall: Boolean(this.props.displayall) || true
  }

  handleBatchCreated = (batchnew) => {
    //event.preventDefault();
    const batchdet = batchnew;
    console.log("batch details cprops received after create batch - batchmain", batchdet);

    this.setState({
      batchdet: batchdet,
      displaybatch: false
    },
      () => {

        console.log('Setstate callback-batchmain', this.state.batchdet);
      }); //    end thistate
  }; // end handlebatchcreated    

  renderPage = () => {
    if (this.state.displayall) {
      return <Createbatch
        onInsert={this.handleBatchCreated} />
    }
    else {
      <BatchInfo batchdetails={this.state.batchdet}
        newbatch={true} />
    }
  }

  render() {
    return (<div>
      {this.renderPage()}
    </div>
    ) // end return
  }// end render

} // end class Batchmain

export default Batchmain;
