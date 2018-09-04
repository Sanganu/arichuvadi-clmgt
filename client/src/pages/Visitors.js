import React, { Component } from 'react';
import Teacherheader from '../components/Teacherheader';
import Footer from '../components/Footer';
import axios from 'axios';
// import YoutubeVideos from 'youtube-api-search';
import Video from "./Video";
import API from "./keyvalues" ;
// import Visitor from "./Visitor.js";
// import { ENGINE_METHOD_PKEY_ASN1_METHS } from 'constants';

class Visitors extends Component 
{
  state = {
    APIkey : API.APIkey,
    videos: []
  }
  componentDidMount = () =>{
    // YoutubeVideos({key:this.state.APIkey,channelId: 'UCPhfI5zJU2vCnVBOA13Jrig'},videos => {
    //   console.log("Videos received----",videos)
    //   this.setState({videos:videos});
    // });
    axios.get('/api/visitors')
    .then((videos) =>{
      console.log("Videos Received",videos);
      this.setState({videos:videos})
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

  