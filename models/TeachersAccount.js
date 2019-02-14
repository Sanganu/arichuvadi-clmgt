
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
       levels: [{
          type:String
        }],
        batchId :[{
          type: Schema.Types.ObjectId,
          ref: batchdetails
        }],
        createdDate: {
           type:Date,
           default: Date.now
         }
});


const teacheraccount = mongoose.model("teacheraccount", teacheraccountSchema);
module.exports = teacheraccount;
