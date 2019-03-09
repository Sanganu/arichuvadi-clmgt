
import React, { Component } from 'react';

class Video extends Component {
  componentWillReceiveProps = (nextprops) => {
    console.log("Props",nextprops)
  }
  render()
  {
    let videolink = `http://www.youtube.com/embed/${this.props.content.id}?autoplay=0`
    return(<div className="card">
          <div className = "embed-responsive embed-responsive-16by9">
          <iframe className ="embed-responsive-item"
          src = {videolink}>
          </iframe>
          </div>
         <h4 className = "card-title">{this.props.content.title}</h4>
         {/* <p className = "card-text">{this.props.content.description}</p> */}
         {/* {this.props.content.thumbnail} */}
    </div>)
  }
    
}
  
export default Video;
 