
import React, { Component } from 'react';

class Video extends Component {
  componentWillReceiveProps = (nextprops) => {
    console.log("Props",nextprops)
  }
  render()
  {
    let videolink = "http://www.youtube.com/embed/"+ this.props.content.id
    return(<div className="card-body">
         <img className="card-img-top" src= {this.props.content.thumbnail} /> 
         <iframe controls>
          src= 'https://youtu.be/Us6NO6aJiWY'
        </iframe>
         <h4 className = "card-title">{this.props.content.title}</h4>
         <p className = "card-text">{this.props.content.description}</p>
         {/* {this.props.content.thumbnail} */}
    </div>)
  }
    
}
  
export default Video;
 