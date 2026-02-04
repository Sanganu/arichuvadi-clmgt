
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const boardMemberSchema = new Schema({

        fname: {
           type: String,
           required:true,
           alias: 'First Name',
           match:[/^[A-Za-z\s]{2,50}$/,"First name should contain only characters"]
         },
         lname: {
          type: String,
          required:true,
          alias:'Last Name',
          match:[/^[A-Za-z\s]{2,50}$/,"Last name should contain only alphabets"]
        },
        description:{
          type: String,
          required:true,
          minLength:10,
          match:[/^.{10,500}$/,"Description should be 10 - 500 characters only"]
        },
        designation:{
          type:String,
          required:true,
          match:[/^[A-Za-z\s]{2,100}$/,"Designation must contain alphabets"]
        },
         loginemail: {
           type: String,
           unique: true,
           required : true,
           lowercase:true,
           trim:true,
           match:[/^\w+([.-]?\w+)*@\w+([.+]?\w+)*(\.\w{2,3})+$/,"Please enter a valid address"]
         },
         password:{
           type: String,
           required:true,
           select:false,
           match:[
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/,
            "Password must be at least 8 chars and should include upper, lower, number & symbol"
           ]
         },
         phone: {
          type:String,
          set: v => v.replace(/\D/g, ''), // removes -, spaces, ()
          match:[
            /^\+?[1-9]\d{7,14}$/,
            "Phone number must be valid"
          ]
        },
        zoomlink:{
          type: String,
           match: [
      /^https?:\/\/.+/,
      'Zoom link must be a valid URL'
    ]
        },
        skypeId: {
          type: String,
          match: [
      /^[a-zA-Z][a-zA-Z0-9.,-_]{5,31}$/,
      'Invalid Skype ID'
    ]
        },
        batchId :[{
          type: Schema.Types.ObjectId,
          ref: 'batchdetails'
        }],
        createdDate: {
           type:Date,
           default: Date.now
         }
        }
         ,{
           toJSON : {
             virtuals:true,
           },
           toObjecy:{
            virtuals:true
           }
         }
);

boardMemberSchema.methods.checkPassword = function(inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	};



// Define hooks for pre-saving
boardMemberSchema.pre('save',async function(next) {
	if (!this.isModified('password')) return next();
  try{
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
  }catch(err){
    next(err)
  }
});


boardMemberSchema.virtual('fullName').get(function(){
  return `${this.fname} ${this.lname}`
})


const Boarddetails = mongoose.model("Boarddetails", boardMemberSchema);

export default Boarddetails;

