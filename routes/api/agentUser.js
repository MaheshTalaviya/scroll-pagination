const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const auth = require("../../config/authenticateToken");
const ObjectId = require("mongodb").ObjectID;
const User = require("../../models/userAgent");
router.post("/login", (req, res) => {
const email = req.body.email;
  const password = req.body.password;
// Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }
// Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };
// Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              user:user
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ message: "Password incorrect" });
      }
    });
  });
});

router.post("/register", (req, res) => {
User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        user_type:req.body.user_type,
        city:req.body.city
      });
// Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json({data:user,status:true,message:"Registration completed successfully !"}))
            .catch(err => {
              console.log(err)
              res.json({data:err,status:false,message:"Something Wrong!"});
            });
        });
      });
    }
  });





  // @route POST api/users/login
// @desc Login user and return JWT token
// @access Public


});

router.get("/getAgents",auth, (req, res) => {
  let objValue={
     user_type:req.query.status
  }
  if(req.query.city){
      objValue.city=req.query.city
  }

  User.find(objValue).then(efrTicket => {
    res.json({data:efrTicket,status:true,message:"Agent record Found !"});
  })
  .catch(err => {
    console.log(err)
    res.json({data:err,status:false,message:"Something Wrong!"});
  });
});

router.post("/getAgentCitys",auth, (req, res) => {
 
  User.find({user_type:req.body.data.status,_id:req.body.data.agentId}).then(efrTicket => {
    res.json({data:efrTicket,status:true,message:"DUP record Found !"});
  })
  .catch(err => {
    console.log(err)
    res.json({data:err,status:false,message:"Something Wrong!"});
  });
});

router.post("/userCityUpdate",auth,  (req, res) => {
  const updateId=req.body.data.userId;
  const userCity=req.body.data.city;
  
 console.log(req.body)
  User.updateOne({ "_id": ObjectId(updateId)}, 
  {"$set": { 
    city:userCity
  }}).then(efrTicket => {
    res.json({data:efrTicket,status:true,message:"Reacord Update"});
  })
  .catch(err => {
    console.log(err)
    res.json({data:err,status:false,message:"Something Wrong!"});
  });
});
module.exports = router;