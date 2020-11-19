import axios from "axios";

export default {
    newBatch: function(batchdetails){
        return  axios.post('/api/teacher/batch/new',batchdetails)
    },
    deleteBatch: function(id){
        return    axios.delete(`/api/teacher/batch/delete/${id}`)
    },
    getClassDetails: function(bid){
        return    axios.get('/api/teacher/batch/student/class/details/' + bid)
    }
}