import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

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
  teacher: {
    type: Schema.Types.ObjectId,
    refPath: 'teacherModel',
    required: true
  },
  teacherModel: {
    type: String,
    required: true,
    enum: ["Boarddetails", "Instructor"]
  },
  examDate: {
    type: Date
  },
  students: [{
    type: Schema.Types.ObjectId,
    ref: 'studentdetails'
  }],
  classid: [{
    type: Schema.Types.ObjectId,
    ref: 'classdetails'
  }],
  createdDate: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

batchdetailsSchema.virtual('teacherName').get(function () {
  if (!this.teacher || typeof this.teacher === 'string') return null;
  return `${this.teacher.fname} ${this.teacher.lname}`;
});

batchdetailsSchema.index({ teacher: 1, teacherModel: 1 });


const Batchdetails = mongoose.model("Batchdetails", batchdetailsSchema);

export default Batchdetails;
