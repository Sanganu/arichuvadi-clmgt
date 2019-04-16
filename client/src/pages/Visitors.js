import React, { Component } from 'react';
import Teacherheader from '../components/Teacherheader';
import axios from 'axios';
import Video from "./Video";
import { Menubar } from "../components/Menubar";
import keys from "../keys/keys.js";
import myyoutube from "youtube-api-search";
import dotenv from 'dotenv';
dotenv.config();
const API_KEY = process.env.API_YOUTUBE;

class Visitors extends Component {
  state = {
    videos: [],
    searchvideo: ""
  }

  searchfor = () => {
    // axios.get('/api/visitors/'+this.searchvideo)
    //   .then((videos) => {
    //     //console.log("Videos Received",videos.data);
    //     this.setState({ videos: videos.data }
    //       , () => { console.log("The Response from Axios", this.state.videos) })
    //   }).catch((error) => {
    //     console.log("Error....", error);
    //   });
    const searchterm = this.statesearchvideo || "Uyir Ezhuthukal";
     myyoutube({key : API_KEY,searchterm},(error,data) =>{
      if (error) console.log("Error in fetching youtube Videos",error);
      console.log("Youtube Data",data);
     });
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value },()=> console.log("Input",name,value))
  }


  render() {
    const videos = this.state.videos || "";
    return (<div>
      <Teacherheader />
      <div className="middlecontent">
        <div className="row">
          <div className="col-md-1 col-sm-1 col-lg-1">
            <Menubar />
          </div>
          <div className="col-md-5 col-sm-5 col-lg-5">
            <form className="inputsection">
              <input type="text"
                className="form-control"
                name="searchvideo"
                value={this.state.searchvideo}
                id="searchvideo"
                onChange={this.handleInputChange} />
              <button onClick={this.searchfor}>
              Search for Reference Youtube Videos</button>
            </form>
          </div>
          <div className="col-md-5 col-lg-5 col-sm-5">
            <div className="gifcontainer">
              <iframe src="https://giphy.com/embed/XB3V7fwrzbLxuJSc2j"
                width="250" height="250" frameBorder="0" title="gifframe" className="giphy-embed"
                allowFullScreen></iframe>
            </div>
          </div>
        </div>
       {videos && videos.length ?
        <div className="card-columns">
          {videos.map((data, index) =>
            <Video key={index}
              content={data} />
          )}
        </div>
        :<div></div>}
     </div>
    </div>) 
         }
      }
      
      export default Visitors;
      
  