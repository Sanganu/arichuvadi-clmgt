const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')
//mongoose.promise = Promise

const studentSchema = new Schema({

          studentfname: {
               type: String,
               required: true,
               alias:'firstname'
          },
          studentlname: {
              type: String,
              required: true,
              alias:'lastname'
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
            levelcompleted:{
              type:String,
              // required:true
            },
            levelrequested:{
              type: String,
              // required: true
            },
          createdDate  : {
            type: Date,
            default: Date.now
          },
          batchid : {
            type: Schema.Types.ObjectId,
            ref: 'batchdetails'
          },
          teachersComments:[{
            date: Date,
            notes:String
          }]}, {
            toJSON : {
              virtuals:true,
            }
          }
);


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

//Virtuals
studentSchema.virtual('fullName').get(function(){
  return this.studentfname+ ' '+this.studentlname;
})


const Students = mongoose.model("studentdetails", studentSchema);
module.exports = Students;
