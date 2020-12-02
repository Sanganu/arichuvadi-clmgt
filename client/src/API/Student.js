import axios from "axios";

export default  {
    createNewStudent: function(studentData){
       return axios.post("/api/student/new",studentData)
    },
    getAllStudents: function(){
        return   axios.get("/api/students/all")
    },
    deleteStudent: function(id){
        return   axios.delete("/api/student/delete/" + id)
    },
    updateStudentDetails: function(studentrecord){
        return     axios.put("/api/student/update/" + studentrecord.recid, studentrecord)
    },
    getAllStudentId: function(){
        return axios.get("/api/student/iddetails/")
    },
    addStudentToBatch: function(bidsid){
        return axios.put("/api/board/batch/student/",bidsid)
    },
    addNewStudentToBatch: function(student){
        return     axios.post('/api/board/batch/student/new',student)
    }
} 