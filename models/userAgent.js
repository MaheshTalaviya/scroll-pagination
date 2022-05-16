const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserAgentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  city: {
    type: String,
    default:'la,sd,miami,dallas,houston,denver,phoenix,austin,orlando,tampa,atl'
  },

  user_type: {
    type: String,
    enum : ['AGENT','ADMIN1','ADMIN2','ADMIN3','LEAD','DUP','OUTREACH'],
    required: true
  },
  adminid:{ type: Schema.Types.ObjectId ,default:null},
  efrticket: [{ type: Schema.Types.ObjectId, ref: 'efrticket' }],
},
{ timestamps: true }
);
module.exports = User = mongoose.model("userAgents", UserAgentSchema);