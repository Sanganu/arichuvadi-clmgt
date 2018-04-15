const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({

          studentfname: {
               type: String,
               required: true
          },
          studentlname: {
              type: String,
              required: true,
            },
            loginemail: {
              type:String,
              required: true,
              unique: true
            },
            parentname: {
              type: String,
              required: true,
            },
            parentphonenumber: {
              type:String,

            },
            username: {
              type: String,
            },
            passw: {
              type: String
            },
          createdDate : {
            type: Date,
            default: Date.now
          },
          batchid : {
            type: Schema.Types.ObjectId,
            ref: 'batchdetails'
          }
});
const studentdetails = mongoose.model("studentdetails", studentSchema);
module.exports = studentdetails;
