import React, { Component } from 'react';
// import Appheader from '../components/Appheader';
import axios from 'axios';
import Video from "./Video";
// import { Menubar } from "../components/Menubar";
//import keys from "../keys/keys.js";
// import myyoutube from "youtube-api-search";
// import myYoutube from "./myYoutube";

//const API_KEY = process.env.API_YOUTUBE || keys.API_YOUTUBE;

class Videoreference extends Component {
  state = {
    videos: [],
    searchvideo: ""
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      // console.log("Input",name,value))
    });
  }

  

  searchfor = (event) => {
        event.preventDefault();
        console.log("Before axios", this.state.searchvideo);
        let searchstr = this.state.searchvideo || "uyir ezhuthukal"
        axios.get(`/api/visitors/${searchstr}`)
        .then((response) => {
              console.log("+++then+++");
              console.log("Response: ", response.data.videos);
              this.setState({
                videos: response.data.videos,
                searchvideo:""
              },
                () => {
                  console.log("Axios call to back end to fetch youtube videos")
                }); // End of state
        }).catch((error) => {
          console.log("Error in fetching youtube videos", error);
        }); // End axios
  }



  render() {
    const videos = this.state.videos || "";
    return (<div className="middlecontent">
                 <div>
                       <h4 className="subhead">Youtube Search</h4>
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
                      
     
              <div className = "row">  
                {videos && videos.length ?
                  <div className="card-columns">
                    {videos.map((data, index) =>
                      <Video key={index}
                        content={data} />
                    )}
                  </div> 
                  : <div></div>}
              </div>  
      </div>)
  }
}

export default Videoreference;

