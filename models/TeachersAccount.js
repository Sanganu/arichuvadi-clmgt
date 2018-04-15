
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teacheraccountSchema = new Schema({

        name: {
           type: String,
         },
         email: {
           type: String,
           unique: true,
           required : true
         },
        phone: {
          type:String
        },
       subjects: [{
          type:String
        }],
        schoolname :{
          type: String,
        },
        createdDate: {
           type:Date,
           default: Date.now
         },
         facebook: {
           type:String
         },
         youtubechannel :{
           type:string
         }
});


const teacheraccount = mongoose.model("teacheraccount", teacheraccountSchema);
module.exports = teacheraccount;
