
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const teacherMemberSchema = new Schema({

        fname: {
           type: String,
           required:true
         },
         lname: {
          type: String,
          required:true
        },
        description:{
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
        batchId :[{
          type: Schema.Types.ObjectId,
          ref: 'batchdetails'
        }],
        createdDate: {
           type:Date,
           default: Date.now
         }
});

teacherMemberSchema.methods = {
	checkPassword: function(inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Define hooks for pre-saving
teacherMemberSchema.pre('save', function(next) {
	if (!this.password) {
		console.log('=======NO PASSWORD PROVIDED=======')
		next()
	} else {
		this.password = this.hashPassword(this.password)
		next()
	}
});

// Define hooks for pre-saving
teacherMemberSchema.pre('create', function(next) {
	if (!this.password) {
		console.log('=======NO PASSWORD PROVIDED=======')
		next()
	} else {
		this.password = this.hashPassword(this.password)
		next()
	}
});

const teacherdetails = mongoose.model("teacherdetails", teacherMemberSchema);
module.exports = teacherdetails;
