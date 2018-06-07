import React, { Component } from 'react';
import Teacherheader from '../components/Teacherheader';
import axios from 'axios';
import Resultrecords from './Resultrecords';

  
class Searchstudents extends Component{

   state = {
       searchstring: '',
       results: [{}],
       foundrecords: false,
       displaymessage: false,
    }

   searchrecords = (event) => {
        event.preventDefault();
        console.log("BEfore axios call - search str",this.state.searchstring)
        axios.get(`/api/teacher/search/${this.state.searchstring}`)
            .then((response) => {
                console.log("Results from search",response);
                let matchrecords = [];
                let found = false;
                let displaymessage = false;
                if (response.data.length > 0){
                    found = true;
                    displaymessage = false
                   for (let i =0; i < response.data.length; i++)
                   {
                      
                       let currentrec = {
                           id : response.data[i]._id,
                           batch: response.data[i].batchid.batchdesc,
                           loginemail: response.data[i].loginemail,
                           parentname : response.data[i].parentname,
                           phone : response.data[i].parentphonenumber,
                           student : response.data[i].studentfname+ " "+response.data[i].studentlname
                       }
                       matchrecords.push(currentrec)
                   } 
                } 
                else{
                     displaymessage = true
                     found = false;
                }  
                this.setState({results: matchrecords,foundrecords: found,displaymessage : displaymessage},
                    () => {
                        console.log("State",this.state.results,'found', this.state.foundrecords);
                    });
            })
            .catch((err) => {
                console.log("The error:",err);
            });
   }

   handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name  = target.name;
    //console.log('The Value in input change',value,name);

    this.setState({
       [name]: value
     });
};

detailsdisplay = () => {
      
 }
  
    render(){
        let resultset = this.state.results
        return(<div><Teacherheader />
            <h4>Search Student Details </h4>
            <form className="inputsection">
                  <div className = "form-group row">
                               <label forhtml = "searchstring" id ="lsearchstr">Search By Student Name / Email / Parentname  </label><br />
                         <input className="textarea" onChange  = {this.handleInputChange} type="text" name="searchstring"  value={this.state.searchstring} /><br />.
                         <button name = "searchbtn" onClick = {this.searchrecords}>Search</button>
                  </div>
             </form> 
             {this.state.foundrecords ?
              <div>{resultset.map((data,index) =>
                <Resultrecords recid = {data.id} 
                               key={index}
                               recbatchid = {data.batch}
                               reclogin = {data.loginemail}
                               recparent = {data.parentname}
                               recphone = {data.phone}
                               recstudent = {data.student}
                                /> )}</div> :<div></div>}
              {this.state.displaymessage ? <div>No Student details found</div>:<div></div>}          
        </div>);
    }
    
}
export default Searchstudents;

  