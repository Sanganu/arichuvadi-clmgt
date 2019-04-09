import React, { Component } from 'react';
import Teacherheader from '../components/Teacherheader';
import axios from 'axios';
import Video from "./Video";
import { Menubar } from "../components/Menubar";

class Visitors extends Component {
  state = {
    videos: [],
    searchvideo: ""
  }

  componentDidMount = () => {
    axios.get('/api/visitors')
      .then((videos) => {
        //console.log("Videos Received",videos.data);
        this.setState({ videos: videos.data }
          , () => { console.log("The Response from Axios", this.state.videos) })
      }).catch((error) => {
        console.log("Error....", error);
      });
  }

  handleInputChange = (event) => {
    const { name, value } = event;
    this.setState({ [name]: value })
  }


  render() {
    const videos = this.state.videos || "";
    return (<div>
      <Teacherheader />
      <div className="middlecontent">
        <div className="row">
          <div className="col-md-1 col-lg-1">
            <Menubar />
          </div>
          <div className="col-md-8">
            <form className="inputsection">
              <input type="text"
                className="form-control"
                name="searchvideo"
                value={this.state.searchvideo}
                id="searchvideo"
                onChange={this.handleInputChange} />
              <button id="searchFor" onClick={this.searchfor}>Search for Reference Youtube Videos</button>
            </form>
          </div>
        </div>
        {videos && videos.length ?
          <div className="card-columns">
            {videos.map((data, index) =>
              <Video key={index}
                content={data} />
            )}
          </div>
          : <div className="gifcontainer">
           
              <iframe src="https://giphy.com/embed/XB3V7fwrzbLxuJSc2j" width="480" height="372" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/tamil-XB3V7fwrzbLxuJSc2j">via GIPHY</a></p>
          </div>}
     </div>
    </div>) 
     }
  }
  
  export default Visitors;
  
  