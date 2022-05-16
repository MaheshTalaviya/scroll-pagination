const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const CsvDataTable = new Schema({
 
  emailId: {
    type: String,
  },
  city: {
    type: String,
  },
    audioMessage: {
    type: String,
  },
   info: {
    type: String,
  },
  uname: {
    type: String,
  },
  introId:{
    type:String
  },
  personalPhoto:{
    type:String
  },
  imageCredit:{
    type:String
  },

   question1Response:{
    type:Object
  },
   question2Response:{
    type:Object
  },
   question3Response:{
    type:Object
  },
   question4Response:{
    type:Object
  },
  status: {
    type: String,
    enum : ['RECORDINTRO'],  
  }
  
},
{ timestamps: true }
);
module.exports = User = mongoose.model("csvDataTable", CsvDataTable);