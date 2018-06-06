const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')
mongoose.promise = Promise

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
            password: {
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


studentSchema.methods = {
	checkPassword: function(inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Define hooks for pre-saving
studentSchema.pre('save', function(next) {
	if (!this.password) {
		console.log('=======NO PASSWORD PROVIDED=======')
		next()
	} else {
		this.password = this.hashPassword(this.password)
		next()
	}
});

// Define hooks for pre-saving
studentSchema.pre('create', function(next) {
	if (!this.password) {
		console.log('=======NO PASSWORD PROVIDED=======')
		next()
	} else {
		this.password = this.hashPassword(this.password)
		next()
	}
});

const Students = mongoose.model("studentdetails", studentSchema);
module.exports = Students;
