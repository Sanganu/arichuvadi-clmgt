 import React, { Component } from 'react';
import axios from 'axios';

class Searchlist extends Component {
  constructor(super){
    state = {
      batchrecords: []
    }
  }
  handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name  = target.name;
        console.log('The Value in input change',value,name);

        this.setState({
           [name]: value
         } /*,
         () =>{
           console.log('Set State in Main Section',value,name);
         } */);
  };
 serachButton = () => {
   axios.get('/api/teacher/batch/:param1')
       .then(response =>
         {
           console.log("The Batch Details of  - axios call");
           for (let i =0; i<response.data.length;i+ +)
           {
             //  console.log("Records",response.data[i]._id,response.data[i].batchdesc,response.data[i].batchid,response.data[i].subject,response.data[i].level,response.data[i].rateperhour);
                let currentrec = {
                        recid: response.data[i]._id,
                        recbatid: response.data[i].batchid,
                        recdesc: response.data[i].batchdesc,
                        recsubj: response.data[i].subject,
                        reclevel: response.data[i].level,
                        recrate: response.data[i].rateperhour,
                        recstudents: response.data[i].students
                }
              batchrecords.push(currentrec);
           } // end for
           this.setState({batchrecords : batchrecords}, () => { console.log("State of records",this.state.batchrecords)});
         }) // end then
         .catch( error => {
           console.log("Error in getting batch records!!!",error);
         });
 }

    render()
    {
        return(


        );

    }


}


export default Searchlist;
