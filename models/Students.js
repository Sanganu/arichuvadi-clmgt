const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')

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
// studentSchema.methods = {
// 	checkPassword: function(inputPassword) {
// 		return bcrypt.compareSync(inputPassword, this.local.password)
// 	},
// 	hashPassword: plainTextPassword => {
// 		return bcrypt.hashSync(plainTextPassword, 10)
// 	}
// }

// // Define hooks for pre-saving
// studentSchema.pre('save', function(next) {
// 	if (!this.local.password) {
// 		console.log('=======NO PASSWORD PROVIDED=======')
// 		next()
// 	} else {
// 		this.local.password = this.hashPassword(this.local.password)
// 		next()
// 	}
// 	// this.password = this.hashPassword(this.password)
// 	// next()
// })

const studentdetails = mongoose.model("studentdetails", studentSchema);
module.exports = studentdetails;
