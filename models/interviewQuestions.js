const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const InterviewQueshtion = new Schema({
 
  adminId: {
    type: String,
  },
  queshionAudio: {
    type: String,
  }
  
},
{ timestamps: true }
);
module.exports = User = mongoose.model("interviewQuestions", InterviewQueshtion);