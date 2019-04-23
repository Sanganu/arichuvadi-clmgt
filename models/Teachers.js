
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teacheraccountSchema = new Schema({

        fname: {
           type: String,
         },
         lname: {
          type: String,
        },
         email: {
           type: String,
           unique: true,
           required : true
         },
         googleId:{
           type: String
         },
         username:{
           type:String
         },
         imglink:{
           type:String
         },
        phone: {
          type:String
        },
        title:{
          type: String
        },
        batchId :[{
          type: Schema.Types.ObjectId,
          ref: 'batchdetails'
        }],
        createdDate: {
           type:Date,
           default: Date.now
         }
});


const teacherdetails = mongoose.model("teacherdetails", teacheraccountSchema);
module.exports = teacherdetails;
