import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const studentSchema = new Schema({

  studentfname: {
    type: String,
    required: true,
    alias: 'firstname',
    match: [/^[A-Za-z\s]{2,50}$/, "First name should contain only characters"]
  },
  studentlname: {
    type: String,
    required: true,
    alias: 'lastname',
    match: [/^[A-Za-z\s]{2,50}$/, "First name should contain only characters"]
  },
  loginemail: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.+]?\w+)*(\.\w{2,3})+$/, "Please enter a valid address"]
  },
  parentname: {
    type: String,
    required: true,
  },
  parentphonenumber: {
    type: String,
    required: true,
    alias: "Parent Name",
    required: true,
    match: [/^[A-Za-z\s]{2,50}$/, "Last name should contain only alphabets"]
  },
  password: {
    type: String,
    required: true,
    select: false,
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/,
      "Password must be at least 8 chars and should include upper, lower, number & symbol"
    ]
  },
  levelcompleted: {
    type: String,
    // required:true
  },
  grade_enrolled: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  batchid: {
    type: Schema.Types.ObjectId,
    ref: 'batchdetails'
  },
  teachersComments: [{
    date: Date,
    notes: String
  }]
}, {
  toJSON: {
    virtuals: true,
  }
}
);


studentSchema.methods.checkPassword = function (inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password)
  }
// Define hooks for pre-saving
studentSchema.pre('save',async function (next) {
  if (!this.isModified('password')) return next();
    try{
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password,salt);
      next();
    }catch(err){
      next(err)
    }
  });

// // Define hooks for pre-saving
// studentSchema.pre('create', function (next) {
//   if (!this.password) {
//     console.log('=======NO PASSWORD PROVIDED=======')
//     next()
//   } else {
//     this.password = this.hashPassword(this.password)
//     next()
//   }
// });

//Virtuals
studentSchema.virtual('fullName').get(function () {
  return this.studentfname + ' ' + this.studentlname;
})


const Students = mongoose.model("Student", studentSchema);

export default Students;