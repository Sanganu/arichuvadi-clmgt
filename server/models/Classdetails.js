import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;
const classdetailsSchema = new Schema({

        lessoncovered: {
           type: String,
         },
         homework: {
           type: String,
         },
        batch: {
          type: Schema.Types.ObjectId,
          ref: 'batchdetails'
          },
        classdate :{
          type: Date,
        },
        createdDate: {
           type:Date,
           default: Date.now
         }
});

    
const Classdetails = mongoose.model("Classdetails", classdetailsSchema);

export default Classdetails;
