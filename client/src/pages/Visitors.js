import React, { Component } from 'react';
import Teacherheader from '../components/Teacherheader';
import Footer from '../components/Footer';
import axios from 'axios';
import YoutubeVideos from 'youtube-api-search';
import Video from "./Video";
import API from "./keyvalues" ;
// import { ENGINE_METHOD_PKEY_ASN1_METHS } from 'constants';

class Visitors extends Component 
{
  state = {
    APIkey : API.APIkey,
    videos: []
  }
  componentDidMount = () =>{
    YoutubeVideos({key:this.state.APIkey, channelId: 'UCuOkzLl_DwqbPuvxi774zmw'},videos => {
      console.log("Videos received",videos)
      this.setState({videos:videos});
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
                 <Footer />
           </div>)
      }
}

export default Visitors
  