import React, { Component } from 'react';
import Teacherheader from '../components/Teacherheader';
import axios from 'axios';


class Searchstudents extends Component{

    state = {
        searchstring: '',
        results: []
    }
 
    searchrecords = () => {
 
     axios.get(`/api/teacher/batch/${this.state.searchstring}`)
          .then((response) => {
              console.log("Results from search",response);
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
     
     render(){
         return(<Teacherheader />
            <h4>Search Batch Details </h4>
            <form className="inputsection">
                  
                  <div className = "form-group row">
                         <label forhtml = "searchstr" id ="lemail">Search By  </label><br />
                         <input className="textarea" onChange  = {this.handleInputChange} type="text" name="searchstr"  value={this.state.searchstr} /><br />.
                  </div>
             </form>           
         )}
}   //  end search students

export default Searchstudents;
