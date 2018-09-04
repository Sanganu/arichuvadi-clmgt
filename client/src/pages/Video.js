
import React, { Component } from 'react';

class Video extends Component {
  componentWillReceiveProps = (nextprops) => {
    console.log("Props",nextprops)
  }
  render()
  {
    let sourceurl = "https://www.youtube.com/embed/"+this.props.content.id
    return(<div>
         {/* <img src= {this.props.content.snippet.thumbnails.default.url} />  */}
         <iframe title = "Performance" src = {sourceurl} />
         {this.props.content.title}
         {this.props.content.description}
         {this.props.content.thumbnail}
    </div>)
  }
    
}
  
export default Video;
 