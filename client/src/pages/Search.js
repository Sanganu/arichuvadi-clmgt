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
                if (response.data.studentdetails.length > 0 ||
                    response.data.batchdetails.length > 0){
                    found = true;
                    displaymessage = false
                    for (let i =0; i < response.data.studentdetails.length; i++)
                    {
                        
                        let currentrec = {
                            id : response.data.studentdetails[i]._id,
                            batch: response.data.studentdetails[i].batchid,
                            loginemail: response.data.studentdetails[i].loginemail,
                            parentname : response.data.studentdetails[i].parentname,
                            phone : response.data.studentdetails[i].parentphonenumber,
                            student : response.data.studentdetails[i].studentfname+ " "+response.data.studentdetails[i].studentlname
                        }
                        matchrecords.push(currentrec)
                    } 
                    for (let i =0; i < response.data.batchdetails.length; i++)
                    {
                      
                       let currentrec = {
                           id : response.data.batchdetails[i]._id,
                           batch: response.data.batchdetails[i].batchdesc,
                           loginemail: response.data.batchdetails[i].subject,
                           parentname : response.data.batchdetails[i].level,
                           phone : response.data.batchdetails[i].rateperhout,
                           student : response.data.batchdetails[i].students,
                           classes: response.data.batchdetails[i].classes
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

  