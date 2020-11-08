import axios from "axios";

export default {
    getAllInstructors : function(){
        return axios("/api/instructor/all")
    }
}