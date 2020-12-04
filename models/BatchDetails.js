const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const batchdetailsSchema = new Schema({
        batchdesc: {
           type: String
         },
         course: {
           type: String
         },
        level: {
          type: String
        },
        teacher  :{
          type:Schema.Types.ObjectId,
          ref: 'boarddetails'
        },
        examDate:{
          type:Date
        },
        students: [{
          type: Schema.Types.ObjectId,
          ref: 'studentdetails'
        }],
        classid :[{
          type:Schema.Types.ObjectId,
          ref:'classdetails'
        }],
       createdDate: {
          type:Date,
          default: Date.now
        },
});


const batchdetails = mongoose.model("batchdetails", batchdetailsSchema);
module.exports = batchdetails;
