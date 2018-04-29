import React, { Component } from 'react';
import Teacherheader from '../components/Teacherheader';
import axios from 'axios';


class Searchstudents extends Component{

   state = {
       searchstring: '',
       results: []
   }

   searchrecords = () => {

    axios.get(`/api/teacher/studentdetails/str=${this.state.searchstring}`)
         .then((response) => {
             console.log("Results from search",response);
             this.setState({results: response.data},
                  () => {
                      console.log("State",this.state.results);
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

  
    render(){
        return(<div><Teacherheader />
            <h4>Search Student Details </h4>
            <form className="inputsection">
                  
                  <div className = "form-group row">
                         <label forhtml = "searchstr" id ="lsearchstr">Search By Student Name / Email / Parentname  </label><br />
                         <input className="textarea" onChange  = {this.handleInputChange} type="text" name="searchstr" id="searchstr" value={this.state.searchstr} /><br />.
                  </div>
             </form>            
        </div>);
    }
    
}
export default Searchstudents;

