import React, { Component } from 'react';
import Teacherheader from '../components/Teacherheader';
import axios from 'axios';
import Video from "./Video";
import { Menubar } from "../components/Menubar";
import keys from "../keys/keys.js";
// import myyoutube from "youtube-api-search";
// import myYoutube from "./myYoutube";
// import axios from 'axios';

// import dotenv from 'dotenv';
// dotenv.config();
const API_KEY = process.env.API_YOUTUBE || keys.API_YOUTUBE;

class Referencevideos extends Component {
  state = {
    videos: [],
    searchvideo: ""
  }

  // searchfor2 = () =>{
  //   const searchterm = this.statesearchvideo || "Uyir Ezhuthukal";

  // }
  // searchfor1 = () => {

  //   const searchterm = this.statesearchvideo || "Uyir Ezhuthukal";
  //   console.log("API_",API_KEY)
  //    myyoutube({
  //      key : API_KEY,searchterm},(data) =>{
  //     if (data) console.log("Error in fetching youtube Videos",data);
  //     this.setState({videos:data},() => {console.log("Youtube Data",this.state.videos)});
  //    });
  // }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      // console.log("Input",name,value))
    });
  }

  axiosrun = (searchstr) => {
    return axios.get(`/api/visitors/${searchstr}`)
      .then(videos => {
        console.log("++++++", videos, "===========");
        return videos.data
      })
      .catch(error => { console.log("Error", error) });
  }

  searchfor = () => {
    console.log("Before axios", this.state.searchvideo);
    let searchstr = this.state.searchvideo || "uyir ezhuthukal"
    this.axiosrun(searchstr).then(data => {
      console.log("+++then+++");
      console.log("Response", data);
      this.setState({
        videos: data
      },
        () => {
          console.log("Axios call to back end to fetch youtube videos")
        }); // End of state
    }).catch((error) => {
      console.log("Error in fetching youtube videos", error);
    }); // End axiosrun
    console.log("....");
  }



  render() {
    const videos = this.state.videos || "";
    return (<div>
      <Teacherheader />

      <div className="row">
            <div className="col-md-1 col-sm-1 col-lg-1">
              <Menubar />
            </div>
             <div className="middlecontent">
                      <div className="col-md-5 col-sm-5 col-lg-5">
                        <h4 className="subhead">Youtube Search...In Progress...</h4>
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
      </div>
      {videos && videos.length ?
        <div className="card-columns">
          {videos.map((data, index) =>
            <Video key={index}
              content={data} />
          )}
        </div>
        : <div></div>}
    </div>
 )
  }
}

export default Referencevideos;

