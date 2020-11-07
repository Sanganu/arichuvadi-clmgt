import axios from "axios";

export default {
    newBatch: function(batchdetails){
        return  axios.post('/api/teacher/batch/new',batchdetails)
    }
}