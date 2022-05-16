const express = require("express");
const router = express.Router();
var mongoose = require('mongoose'); 
const auth = require("../../config/authenticateToken");
const ObjectId = require("mongodb").ObjectID;
const User = require("../../models/userAgent");
// Load csvDataMining model
const CSVUploadData = require("../../models/csvDataMining");
const InterviewQueshtion =require("../../models/interviewQuestions")

var multer  =   require('multer');

const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const aws_access_key_id='FNP2DUC4DIL2ICP2T6A3';
const aws_secret_access_key='ypr9+kD3TirVYnJyneT1DB1GUMjFBbzHD9OKOPmxkoc';

const spacesEndpoint = new aws.Endpoint('sfo3.digitaloceanspaces.com');
const s3 = new aws.S3({
  accessKeyId: aws_access_key_id, 
  secretAccessKey: aws_secret_access_key,
  endpoint: spacesEndpoint
});
function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

router.post("/add", auth, async (req, res) => {
  //  console.log(req.body.data.csvObj)
 
    let responseObj = req.body.data.csvObj;
    var leadCount = 0;
    var dupCount = 0;
    var notAssignCount = 0;
    var totalCount=responseObj.length
    var csvId=makeid(7)
     //console.log('count',responseObj.length)
    var unAssingnArr=[]
     responseObj.map((item)=>{
      
        var insertDataObj={
          
           emailId:item.email,
          
           info:item.info,
           uname:item.name,
           status:'RECORDINTRO',
           introId:makeid(7)
          // city:item.city,
           
       }

       if(item.city === 'LA' || item.city==='la'|| item.city==='los angeles'){
         insertDataObj.city='la'
       }
       if(item.city === 'SD' || item.city==='sd'|| item.city==='san diego'){
         insertDataObj.city='sd'
       }
       if(item.city === 'MIAMI' || item.city==='miami'){
          insertDataObj.city='miami'
       }
       if(item.city === 'DALLAS' || item.city==='dallas'){
          insertDataObj.city='dallas'
       }
       if(item.city === 'HOUSTON' || item.city==='houston'){
          insertDataObj.city='houston'
       }
       if(item.city === 'DENVER' || item.city==='denver'){
          insertDataObj.city='denver'
       }
       if(item.city === 'PHOENIX' || item.city==='phoenix'){
         insertDataObj.city='phoenix'
       }
       if(item.city === 'AUSTIN' || item.city==='austin'){
          insertDataObj.city='austin'
       }
        if(item.city === 'ORLANDO' || item.city==='orlando'){
           insertDataObj.city='orlando'
       }
       if(item.city === 'TAMPA' || item.city==='tampa'){
         insertDataObj.city='tampa'
       }
       if(item.city === 'ATL' || item.city==='atl'|| item.city==='atlanta'){
           insertDataObj.city='atl'
       }


      
      
   

    const newEFRTicket = new CSVUploadData(insertDataObj);
      newEFRTicket
        .save()
        .then(async (efrTicket) => { 
        //console.log('----',efrTicket)
        
     //   res.json({data:efrTicket,status:true,message:"EFR Ticket Created Sucessfully !"});
        })
        .catch(err => {
          console.log(err)
       //   res.json({data:err,status:false,message:"Something Wrong!"});
        });
      
    })


    try{
       res.json({data:{},status:true,message:"CSV Data Instert Sucessfully !"});
    }catch{
       res.json({data:err,status:false,message:"Something Wrong!"});
    }


        
});

function logEvent(rId,status,adminId,description){
  
    // const newEFRTicket = new trackingLog({record_id:rId,status:status,description:description});
    //   newEFRTicket
    //     .save()
    //     .then(async (efrTicket) => { 
    //       console.log('caall',efrTicket)
    //     // res.json({data:efrTicket,status:true,message:"Event Log Created Sucessfully !"});
    //     })
    //     .catch(err => {
    //       console.log(err)
    //       //res.json({data:err,status:false,message:"Something Wrong!"});
    //     });
}




function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
router.post("/QuestionList", (req, res) => {
 // const status = req.query.status;
  InterviewQueshtion.find().then(efrTicket => {
    res.json({data:efrTicket,status:true,message:""});
  })
  .catch(err => {
    console.log(err)
    res.json({data:err,status:false,message:"Something Wrong!"});
  });
});



router.post("/csvReviewList",auth, (req, res) => {
 // const status = req.query.status;
  CSVUploadData.find({csvId:req.body.data.csvId}).then(efrTicket => {
    res.json({data:efrTicket,status:true,message:""});
  })
  .catch(err => {
    console.log(err)
    res.json({data:err,status:false,message:"Something Wrong!"});
  });
});

router.post("/intervieweDetails", (req, res) => {
 // const status = req.query.status;
  CSVUploadData.find({introId:req.body.id}).then(efrTicket => {
    res.json({data:efrTicket,status:true,message:""});
  })
  .catch(err => {
    console.log(err)
    res.json({data:err,status:false,message:"Something Wrong!"});
  });
});


router.get("/adminListRecords",auth, (req, res) => {
  const status = req.query.status;
  CSVUploadData.find({status:status}).then(efrTicket => {
    res.json({data:efrTicket,status:true,message:""});
  })
  .catch(err => {
    console.log(err)
    res.json({data:err,status:false,message:"Something Wrong!"});
  });
});



router.post("/cityWithPginate",auth,paginatedResults(), (req, res) => {
 let data = res.json(res.paginatedResults);
 console.log(data)
   
});


function paginatedResults() {
  return async (req, res, next) => {
    const page = parseInt(req.body.data.page);
    const limit = 1;
    const skipIndex = (page - 1) * limit;
    const results = {};
    let findObj={
      status:req.body.data.status
    }
    if(req.body.data.city)
    {
      findObj.city=req.body.data.city
    }
     if(req.body.data.agentId)
    {
      findObj.agentId=req.body.data.agentId
    }

    try {
       let countTotal = await CSVUploadData.find(findObj).count() 
      results.results = await CSVUploadData.find(findObj)
       
        .limit(limit)
        .skip(skipIndex)
        .exec();
      results.page=page
      results.total=countTotal
      res.paginatedResults = results;
      next();
    } catch (e) {
      res
        .status(500)
        .json({ message: "Error Occured while fetching the data" });
    }
  };
}

// const nameStorage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'public/uploads');
//     },
//     filename: async function (req, file, cb) {
//         let indexOfLastSlash = req.url.lastIndexOf("/");
//         let indexofPersonal = req.url.indexOf("personalUpload");
//         let name = 'v1';
//         let isPersonal = req.url.substring(indexOfLastSlash+1, req.url.length);
//         let fileName, extension;

//         fileName = file.originalname.split(' ').join('_');

//         //Remove special characters except numbers and .
//         fileName = fileName.replace(/[^A-Za-z.0-9]/g, "");
        
//         let indexOfExtensionString = fileName.lastIndexOf(".");
//         extension = fileName.substring(indexOfExtensionString+1, fileName.length);
//         fileName = fileName.substring(0, indexOfExtensionString);
       
//          if (indexofPersonal !== -1) {
//             if (name === 'undefined') {
//                cb(null, "Personal" +"_"+fileName+"_"+Date.now()+"."+extension);
//             } else {
//                 cb(null, "Personal" + name+"_"+"_"+fileName+"_"+Date.now()+"."+extension);
//             }
            
//          } else {
//             if (name === 'undefined') {
//                 cb(null,  fileName+"_"+ Date.now()+"."+extension);
//             } else {
//                 cb(null, name+"_"+"_"+fileName+"_"+Date.now()+"."+extension);
//             }
//          }        
//   }
// });

const upload = multer({
  //storage: nameStorage,
  storage: multerS3({
    s3: s3,
    bucket: 'htvelugwv3tpzippzdc3tcepbfbp8dkno',
    acl: 'public-read',
    key: function (request, file, cb) {
      timeStamp=makeid(10);
      cb(null, '_'+timeStamp);
    }
  })
});

router.post("/imagesUploads/",upload.any('file',2),auth, async (req, res) => {
 
  
 await CSVUploadData.updateOne({ "_id": ObjectId(req.body.userId) }, 
  {"$set": { 
    audioMessage:req.files[0].location
  }}).then(efrTicket => {
    res.json({data:efrTicket,status:true,message:"Reacord Update"});
  })
  .catch(err => {
    console.log(err)
    res.json({data:err,status:false,message:"Something Wrong!"});
  });
})
router.post("/addQuestion",upload.any('file',2),auth, async (req, res) => {
  const newEFRTicket = new InterviewQueshtion({adminId:req.body.adminId,queshionAudio:req.files[0].location});
      newEFRTicket
        .save()
        .then(async (efrTicket) => { 
        
        res.json({data:efrTicket,status:true,message:"Question insert Sucessfully !"});
        })
        .catch(err => {
          console.log(err)
        res.json({data:err,status:false,message:"Something Wrong!"});
        });
});

router.post("/uploadImage",upload.any('file',2), async (req, res) => {
        try{
          res.json({data:req.files[0].location,status:true,message:"Question insert Sucessfully !"});
        }catch(e){
res.json({data:e,status:false,message:"Something Wrong!"});
        }
});

router.post("/queshtionResponse",upload.any('file',2), async (req, res) => {

    var qArray={
          queshtion:req.body.Qid,
          answerAudio:req.files[0].location
        }
  
  if(req.body.Qid==='Q1'){
    var updateValue={'question1Response':qArray}
  }
  if(req.body.Qid==='Q2'){
    var updateValue={'question2Response':qArray}
  }
  if(req.body.Qid==='Q3'){
    var updateValue={'question3Response':qArray}
  }
  if(req.body.Qid==='Q4'){
    var updateValue={'question4Response':qArray}
  }
   
  await CSVUploadData.updateOne({ "introId":req.body.userId}, 
  {"$set":  
    updateValue
  }).then(efrTicket => {
    res.json({data:efrTicket,status:true,message:"Reacord Update"});
  })
  .catch(err => {
    console.log(err)
    res.json({data:err,status:false,message:"Something Wrong!"});
  });
});

router.post("/personalDetails", async (req, res) => {
  
  CSVUploadData.updateOne({ "introId":req.body.id}, 
  {"$set": { 
    'personalPhoto':req.body.photo,'imageCredit':req.body.imageCredit
  }}).then(efrTicket => {
    res.json({data:efrTicket,status:true,message:"Reacord Update"});
  })
  .catch(err => {
    console.log(err)
    res.json({data:err,status:false,message:"Something Wrong!"});
  });
});



//questionResponse


module.exports = router;