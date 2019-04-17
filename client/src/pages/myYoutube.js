import axios from 'axios';
import keys from "../keys/keys.js";
const API_KEY = process.env.API_YOUTUBE || keys.API_YOUTUBE;


export default (axios.create({
        barseURL: "https://www.googleapis.com/youtube/v4/",
        params: {
            part: 'snippet',
            maxResults: 5,
            key: API_KEY
        }
    }));

    

