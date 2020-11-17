import axios from "axios";

export default  {
    createNewStudent: function(studentData){
       return axios.post("/api/student/new",studentData)
    }
}