import axios from "axios";

export default {
    getAllInstructors : function(){
        return axios("/api/instructor/all")
    },
    getSearchResults:function(searchstring){
        return   axios.get(`/api/instructor/search/${searchstring}`)
    }
}