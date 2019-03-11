import React, { Component } from 'react';
import Teacherheader from '../components/Teacherheader';
import Footer from '../components/Footer';
import axios from 'axios';
import Video from "./Video";
import { constants } from 'os';


class Visitors extends Component 
{
  state = {
    videos : [],
    searchvideo:""
  }

  componentDidMount = () =>{
    axios.get('/api/visitors')
    .then((videos) =>{
      //console.log("Videos Received",videos.data);
      this.setState({videos:videos.data}
        ,() => {console.log("The Response from Axios",this.state.videos)})
    }).catch((error) => {
        console.log("Error....",error);
    });
  }

  handleInputChange = (event) => {
     const {name, value} = event;
     this.setState({[name]:value}) 
  }

  searchFor = () => {
    //Youtube search videos api call

  }
  
  render() 
        { const videos =  this.state.videos;
           return(<div>
                   <Teacherheader />
                   <div className="container middlecontent">
                   <div className = "vcontent row">
                     <div className ="col-md-6">
                         <input type="text"
                          className="form-control"
                          name = "searchvideo" 
                          value = {this.state.searchvideo}
                          id ="searchvideo"
                          onChange = {this.handleInputChange} />
                     </div>
                     <div className ="col-md-6">
                         <button id="searchFor" onClick = {this.searchfor}>Search</button>
                     </div>
                   </div>
                   {/* <div className = "card-columns"> */}
                   <div className ="card-columns">  
                     {videos.map((data,index) => 
                        <Video key={index}
                               content = {data} />
                      )}
                    </div>
                   </div>
                 <Footer />
           </div>) 
      }
}

export default Visitors;

  