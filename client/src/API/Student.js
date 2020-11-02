import axios from "axios";

export default  {
    createNewStudent: function(studentData){
       return axios.post("/api/teacher/student/new",studentData)
    }
}