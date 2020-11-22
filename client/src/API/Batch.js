import axios from "axios";

export default {
    newBatch: function(batchdetails){
        return  axios.post('/api/board/batch/new',batchdetails)
    },
    deleteBatch: function(id){
        return    axios.delete(`/api/board/batch/delete/${id}`)
    },
    getClassDetails: function(bid){
        return    axios.get('/api/board/batch/student/class/details/' + bid)
    },
    getAllBatch: function(){
        return axios.get('/api/board/batch/all')
    },
    addClassDetails:function(classdata){
        return   axios.post('/api/instructor/batch/class/add',classdata)
    },
    getBatchDetail: function(batchid){
        return  axios.get("/api/board/batch/detail/"+batchid)
    }
}