
import React, { Component } from 'react';

class Video extends Component {
  
  render()
  {
    let videolink = `https://www.youtube.com/embed/${this.props.content.id}?autoplay=0`
    return(<div className="card">
          <div className = "embed-responsive embed-responsive-16by9">
          <iframe className ="embed-responsive-item"
          title={this.props.content.id}
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
 