
import React, { Component } from 'react';

class Video extends Component {
  componentWillReceiveProps = (nextprops) => {
    console.log("Props",nextprops)
  }
  render()
  {
    let sourceurl = "https://www.youtube.com/embed/"+this.props.content.id.videoId
    return(<div>
         <img src= {this.props.content.snippet.thumbnails.default.url} /> 
         <iframe src = {sourceurl} />
    </div>)
  }
    
}

export default Video;
 