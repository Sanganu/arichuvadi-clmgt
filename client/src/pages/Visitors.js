import React, { Component } from 'react';
import Teacherheader from '../components/Teacherheader';
import Footer from '../components/Footer';
import axios from 'axios';
import Video from "./Video";


class Visitors extends Component 
{
  state = {
    videos : ""
  }
  componentDidMount = () =>{
    axios.get('/api/visitors')
    .then((videos) =>{
      console.log("Videos Received",videos.data);
      this.setState({videos:videos.data}
        ,() => {console.log("The Response from Axios",this.state.videos)})
    }).catch((error) => {
        console.log("Error....",error);
    });
  }
  render() 
        { const videos =  this.state.videos;
           return(<div>
                     <Teacherheader />
                   <div className = "vcontent">
                     {videos.map((video,key) => 
                     <Video key={key}
                            content = {video} />)}
                    </div>
                    {/* <Visitor /> */}
                 <Footer />
           </div>)
      }
}

export default Visitors;

  