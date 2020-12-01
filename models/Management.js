
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const boardMemberSchema = new Schema({

        fname: {
           type: String,
           required:true,
           alias: 'firstname'
         },
         lname: {
          type: String,
          required:true,
          alias:'lastname'
        },
        description:{
          type: String,
          required:true
        },
        designation:{
          type:String,
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
        }
        //  ,{
        //    toJSON : {
        //      virtuals:true,
        //    }
        //  }
);

boardMemberSchema.methods = {
	checkPassword: function(inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Define hooks for pre-saving
boardMemberSchema.pre('save', function(next) {
	if (!this.password) {
		console.log('=======NO PASSWORD PROVIDED=======')
		next()
	} else {
		this.password = this.hashPassword(this.password)
		next()
	}
});

// Define hooks for pre-saving
boardMemberSchema.pre('create', function(next) {
	if (!this.password) {
		console.log('=======NO PASSWORD PROVIDED=======')
		next()
	} else {
		this.password = this.hashPassword(this.password)
		next()
	}
});

//Virtuals
// boardMemberSchema.virtual('fullName').get(function(){
//   return this.fname+ ' '+ this.lname;
// })



const boarddetails = mongoose.model("boarddetails", boardMemberSchema);
module.exports = boarddetails;
