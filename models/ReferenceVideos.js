const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const referencevideosSchema = new Schema({
    youtubeId:{
        type: String,
        required: true
    },
    teacherId:{
        type: Schema.Types.ObjectId,
        ref:'teacherdetails'
    }
    // ,batchId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'batchdetails'
    // }
    //need to finalize this part
});