
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const instructoraccountSchema = new Schema({
        fname: {
           type: String,
           required:true
         },
         lname: {
          type: String,
          required:true
        },
        loginemail: {
           type: String,
           unique: true,
           required : true
         },
         password:{
           type: String,
           required:true,
         },
         phone: {
          type:String
        },
        zoomlink:{
          type: String
        },
        skypeId: {
          type: String
        },
        accountActivated:{
          type:Boolean,
          default:false
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

instructoraccountSchema.methods = {
	checkPassword: function(inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Define hooks for pre-saving
instructoraccountSchema.pre('save', function(next) {
	if (!this.password) {
		console.log('=======NO PASSWORD PROVIDED=======')
		next()
	} else {
		this.password = this.hashPassword(this.password)
		next()
	}
});

// Define hooks for pre-saving
instructoraccountSchema.pre('create', function(next) {
	if (!this.password) {
		console.log('=======NO PASSWORD PROVIDED=======')
		next()
	} else {
		this.password = this.hashPassword(this.password)
		next()
	}
});
const Instructordetails = mongoose.model("Instructordetails", instructoraccountSchema);

export default Instructordetails;
