import axios from "axios";

export default {
    getAllInstructors : function(){
        return axios("/api/instructor/all")
    },
    addClassDetails:function(classdata){
        return   axios.post('/api/instructor/batch/class/add',classdata)
    },
    getSearchResults:function(searchstring){
        return   axios.get(`/api/teacher/search/${searchstring}`)
    }
}