import {useEffect,useState} from 'react'
import axios from "axios";
import {SERVER_URL} from "../../constants";
import setAuthToken from "../../utils/setAuthToken";
import useRecorder from "../common/useRecorder";
import Header from '../user_components/common/header'
import { ToastContainer, toast } from 'react-toastify';

  import 'react-toastify/dist/ReactToastify.css'
const Interview =(props)=>{
     let [audioURL, isRecording, startRecording, stopRecording,audioFileBlob,cancelRecoding,isDelete,isAudioStatus,isMusicLoaderSataus] = useRecorder();
    const [apiRespones,setApiResponse]=useState('')
    const [imageUrl,setImageUrl]=useState('')
    const [imageCredit,setImageCredit]=useState('');
    const [counter,setCounter]=useState()
    const [screen1,setScrren1]=useState(true)
    const [screen2,setScrren2]=useState(false)
    const [screen3,setScrren3]=useState(false)
    const [screen4,setScrren4]=useState(false)
    const [screen5,setScrren5]=useState(false)
    const [screen6,setScrren6]=useState(false)
    const [screen7,setScrren7]=useState(false)
    const [pushA,setPusha]=useState([]);
    const [webSiteUrl,setWebSiteUrl]=useState('');
    const [domainUrl,setDomainUrl]=useState('');
    const [instaUrl,setInstaUrl]=useState('');
    const [fbUrl,setFbUrl]=useState('');
    const [twitterUrl,setTwitterUrl]=useState('');
    const [youTubeUrl,setYouTubeUrl]=useState('');
    const [yelpUrl,setYelpUrl]=useState('');
    const [soundCloudUrl,setSoundCloudUrl]=useState('');
    const [linkedInUrl,setLinkedinUrl]=useState('');
    const [otherUrl,setOtherUrl]=useState('');
    
     const [radio,setRadio]=useState();
     
    const creditChange=(e)=>{
        setImageCredit(e.target.value)
    }
    const sc1Continue=()=>{
        setScrren1(false)
        setScrren2(true)
    }
    const sc2Continue=()=>{
        
        setScrren2(false)
        setCounter(0)
    }
    const radioOnChange=(e)=>{
        setRadio(e.currentTarget.value)
     }
    useEffect(()=>{
        try {
            setAuthToken(); //  Important set token  from res.data to get token
           axios.post(SERVER_URL + "/api/csvData/intervieweDetails",{id:props.match.params.id}).then((response) => {
              setApiResponse(response.data)
              if(response.data.data.length === 0){
                   window.location.href = "/"; 
              }
            }, (error) => {
                console.log(error);
             });
        } catch (e) {
       console.log(e)
        }

    },[])
    useEffect(()=>{
        console.log(counter)
    },[counter])


   useEffect(()=>{
      if(audioURL){
        let a = pushA
            a.push({audioURL:audioURL,audioFileBlob:audioFileBlob,id:Math.floor(Math.random()*(999-100+1)+100)})
            setPusha(a)
        }
    },[audioURL])

    const saveAudio=(queshtion)=>{
    if(pushA.length!==0){

    
            var fileData = new FormData();
          
            fileData.append("userId",props.match.params.id );
            fileData.append("Qid",queshtion);
            var arrindex = 0
            if(radio){
              arrindex=radio
            }
           
            fileData.append("file",pushA[arrindex ].audioFileBlob );
              
            setAuthToken(); //  Important set token  from res.data to get token
           let  res =  axios.post(SERVER_URL + "/api/csvData/queshtionResponse/", fileData,{headers:{'Content-Type':'multipart/form-data'}});
      if(res){
         setPusha([]) 
         toast.success('Audio Question Submited successfully submited.')
  
      }
    }else{
        cancelRecoding()
        setPusha([])
    }

    }
    const savePersonalPhoto=()=>{
         try {
         axios.post(SERVER_URL + "/api/csvData/personalDetails",{id:props.match.params.id,photo:imageUrl,imageCredit:imageCredit}).then((response) => {
             
            }, (error) => {
                console.log(error);
             });
        } catch (e) {
       console.log(e)
        }
    }

    const fileUpload= async(e)=>{
        var fileImage = new FormData();
        
            fileImage.append("file",e.target.files[0]);
              
            setAuthToken(); //  Important set token  from res.data to get token
           let  res = await axios.post(SERVER_URL + "/api/csvData/uploadImage", fileImage,{headers:{'Content-Type':'multipart/form-data'}});
      if(res){
         
        setImageUrl(res?.data?.data)
        
  
      }
    }

    const webSiteUrlChange=(e)=>{
        setWebSiteUrl(e.target.value)
    }
    const domainUrlChange=(e)=>{
        setDomainUrl(e.target.value)
    }
    const instaUrlChange=(e)=>{
        setInstaUrl(e.target.value)
    }
     const fbUrlChange=(e)=>{
        setFbUrl(e.target.value)
    }
    const twitterUrlChange=(e)=>{
        setTwitterUrl(e.target.value)
    }
     const youTubeUrlChange=(e)=>{
        setYouTubeUrl(e.target.value)
    }
     const yelpUrlChange=(e)=>{
        setYelpUrl(e.target.value)
    }
    const soundCloudUrlChange=(e)=>{
        setSoundCloudUrl(e.target.value)
    }
    const linkedInUrlChange=(e)=>{
        setLinkedinUrl(e.target.value)
    }
    const otherUrlChange=(e)=>{
        setOtherUrl(e.target.value)
    }
    

    return (<div><Header/>
    <div className="container">
        <div className="main-div">
           <div className="content">
               <div style={{display:screen1?'block':'none'}}>
            <h3>Welcome to the Shoutout {apiRespones && apiRespones?.data[0]?.city} podcast</h3><br/>
            <p>
               We’d love for you to teach and entertain our audience - we think combination of fun + helpful info is
really powerful and folks are far more likely to remember you, check out your brand, engage with you,
etc if you are able to to teach them something in a fun way. </p>

 <p>We think stories are incredibly engaging and so we’d like you to respond to the podcast questions by
telling stories from your life - almost like you might if you were to meet a friend for drinks after a long
time. </p>

 <p>For each question, please try to paint the picture - we’d love for your personality and voice to shine
through, so please be yourself as that’s always most relatable and engaging.
            </p>
            <input type="button"className="btn btn-success"  onClick={sc1Continue} value="Continue"/>
    </div> 


 <div style={{display:screen2?'block':'none'}}>
            <h3>Episode Intro</h3><br/>
            <p>
              Please listen to our intro and question 1 below and then use the record button to record your
response. You can then listen to your responses and rerecord if necessary and you can choose between
whichever version you like best before moving on to the next question.</p>
<p>Click the play button below to hear Question 1:</p>
 <p><audio  className="audioClass" src={`${apiRespones && apiRespones?.data[0]?.audioMessage} `} controls  /></p>
 <p>Please record your response below :</p>
  <div className="audio-class">
       {
         pushA && pushA.map((item,index)=>{
            return (<><div className="d-flex align-items-center mb-3" >  <input type="radio" onChange={radioOnChange} defaultChecked={index===0 ?true: false}  value={index} name="gender" /> &nbsp;&nbsp; Vesion{index+1}   : <audio  className="audioClass" src={item.audioURL} controls  /></div>
  
   </>)
         })
       }
       
              
             
      </div>
 <div style={{marginTop:"10px"}}>
              <button onClick={startRecording} className="btn btn-warning" style={{display:isRecording?'none':'block'}}>
               <i class="fa fa-play" aria-hidden="true">  Click to start Recording</i>
              </button>
      <button onClick={stopRecording} className="btn btn-danger"style={{display:!isRecording?'none':'block'}}>
       <i className="fa fa-pause" aria-hidden="true"> Click to stop Recording</i>

      </button>
        </div>

 
        <input type="button"className="btn btn-success"  onClick={()=>{saveAudio('Q1')
        setScrren2(false)
        setScrren3(true)
        }}  value="Next"/>
    </div> 

<div style={{display:screen3?'block':'none'}}>
            <h3>Storytime: Professional/Career/Business Lesson</h3><br/>
            <p>
              Please listen to our intro and question 2 below and then use the record button to record your
response. You can then listen to your responses and rerecord if necessary and you can choose between
whichever version you like best before moving on to the next question.</p>
<p>Click the play button below to hear Question 2:</p>
 <p><audio  className="audioClass" src={`${apiRespones && apiRespones?.data[0]?.audioMessage} `} controls  /></p>
 <p>Please record your response below :</p>
  <div className="audio-class">
       {
         pushA && pushA.map((item,index)=>{
            return (<><div className="d-flex align-items-center mb-3" >  <input type="radio" onChange={radioOnChange} defaultChecked={index===0 ?true: false}  value={index} name="gender" /> &nbsp;&nbsp; Vesion{index+1}   : <audio  className="audioClass" src={item.audioURL} controls  /></div>
  
   </>)
         })
       }
       
              
             
      </div>
 <div style={{marginTop:"10px"}}>
              <button onClick={startRecording} className="btn btn-warning" style={{display:isRecording?'none':'block'}}>
               <i class="fa fa-play" aria-hidden="true">  Click to start Recording</i>
              </button>
      <button onClick={stopRecording} className="btn btn-danger"style={{display:!isRecording?'none':'block'}}>
       <i className="fa fa-pause" aria-hidden="true"> Click to stop Recording</i>

      </button>
        </div>

 
            <input type="button"className="btn btn-success"  onClick={()=>{saveAudio('Q2')
          setScrren3(false)
        setScrren4(true)}}  value="Next"/>
    </div> 

    <div style={{display:screen4?'block':'none'}}>
            <h3>Storytime: Personal / Life Lesson</h3><br/>
            <p>
             Please listen to our intro and question 3 below and then use the record button to record your
response. You can then listen to your responses and rerecord if necessary and you can choose between
whichever version you like best before moving on to the next question.</p>
<p>Click the play button below to hear Question 3:</p>
 <p><audio  className="audioClass" src={`${apiRespones && apiRespones?.data[0]?.audioMessage} `} controls  /></p>
 <p>Please record your response below :</p>
  <div className="audio-class">
       {
         pushA && pushA.map((item,index)=>{
            return (<><div className="d-flex align-items-center mb-3" >  <input type="radio" onChange={radioOnChange} defaultChecked={index===0 ?true: false}  value={index} name="gender" /> &nbsp;&nbsp; Vesion{index+1}   : <audio  className="audioClass" src={item.audioURL} controls  /></div>
  
   </>)
         })
       }
       
              
             
      </div>
 <div style={{marginTop:"10px"}}>
              <button onClick={startRecording} className="btn btn-warning" style={{display:isRecording?'none':'block'}}>
               <i class="fa fa-play" aria-hidden="true">  Click to start Recording</i>
              </button>
      <button onClick={stopRecording} className="btn btn-danger"style={{display:!isRecording?'none':'block'}}>
       <i className="fa fa-pause" aria-hidden="true"> Click to stop Recording</i>

      </button>
        </div>

 
            <input type="button"className="btn btn-success"  onClick={()=>{saveAudio('Q3')
          setScrren4(false)
        setScrren5(true)}}  value="Next"/>
    </div> 

       <div style={{display:screen5?'block':'none'}}>
            <h3>How Can Readers Connect with You?</h3><br/>
            <p>
              Finally - no story needed for this one, just short and sweet - what’s the best way for our
listeners to connect with you, learn more, show support, etc</p>
<p>Click the play button below to hear Question 4:</p>
 <p><audio  className="audioClass" src={`${apiRespones && apiRespones?.data[0]?.audioMessage} `} controls  /></p>
 <p>Please record your response below :</p>
  <div className="audio-class">
       {
         pushA && pushA.map((item,index)=>{
            return (<><div className="d-flex align-items-center mb-3" >  <input type="radio" onChange={radioOnChange} defaultChecked={index===0 ?true: false}  value={index} name="gender" /> &nbsp;&nbsp; Vesion{index+1}   : <audio  className="audioClass" src={item.audioURL} controls  /></div>
  
   </>)
         })
       }
       
              
             
      </div>
 <div style={{marginTop:"10px"}}>
              <button onClick={startRecording} className="btn btn-warning" style={{display:isRecording?'none':'block'}}>
               <i class="fa fa-play" aria-hidden="true">  Click to start Recording</i>
              </button>
      <button onClick={stopRecording} className="btn btn-danger"style={{display:!isRecording?'none':'block'}}>
       <i className="fa fa-pause" aria-hidden="true"> Click to stop Recording</i>

      </button>
        </div>

 
            <input type="button"className="btn btn-success"  onClick={()=>{saveAudio('Q4')
        setScrren5(false)
        setScrren6(true)
        }}  value="Next"/>
    </div> 


<div style={{display:screen6?'block':'none'}}>
            <h3>Personal Photo</h3><br/>
            <p>
             Please upload an image of yourself that we can use when promoting the episode.</p>

         <div className="form-group">
                           
             <div class="upload-btn-wrapper">
                {imageUrl ? <img src={imageUrl} height="150" width="150"/>  :''} <br/>
                <button className="btn btn-warning">Upload</button>
                <input type="file" onChange={fileUpload} name="myfile" />
                </div>
            </div>
            <div className="form-group" style={{display:"flex"}}>
                            <label htmlFor="exampleInputPassword1">Image Credits: </label>
                                <input className="form-control" onChange={creditChange}  value={imageCredit}style={{width:'30%'}} type="text"/>
            </div>
             <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Certification box:</label>
                                {/* <input type="text"/> */}
            </div>
            
            <input type="button"className="btn btn-success"  onClick={()=>{savePersonalPhoto()
            setScrren6(false)
        setScrren7(true)}}  value="Next"/>
    </div> 

<div style={{display:screen7?'block':'none'}}>
            <h3>Social Media, Websites &amp; Other Links</h3><br/>
            <p>
             Please provide any links you’d like us to include in the episode notes:</p>
             <p>
                 
                 <input className="form-control"  style={{width:'50%'}} type="text" onChange={webSiteUrlChange} value={webSiteUrl} placeholder="Website"/><br/>
                 <input className="form-control"  style={{width:'50%'}} type="text"  onChange={domainUrlChange} value={domainUrl}placeholder="email@example.com"/><br/>
                 <input className="form-control"  style={{width:'50%'}} type="text" onChange={instaUrlChange} value={instaUrl} placeholder="Instagram URL"/><br/>
                 <input className="form-control"  style={{width:'50%'}} type="text" onChange={fbUrlChange} value={fbUrl} placeholder="Facebook URL"/><br/>
                 <input className="form-control"  style={{width:'50%'}} type="text"  onChange={twitterUrlChange} value={twitterUrl}placeholder="Twitter URL"/><br/>
                 <input className="form-control"  style={{width:'50%'}} type="text" onChange={youTubeUrlChange} value={youTubeUrl} placeholder="Youtube URL"/><br/>
                 <input className="form-control"  style={{width:'50%'}} type="text"  onChange={yelpUrlChange} value={yelpUrl} placeholder="Yelp URL" /><br/>
                 <input className="form-control"  style={{width:'50%'}} type="text"  onChange={soundCloudUrlChange} value={soundCloudUrl}placeholder="SoundCloud URL"/><br/>
                 <input className="form-control"  style={{width:'50%'}} type="text" onChange={linkedInUrlChange} value={linkedInUrl} placeholder="Linkedin URL" /><br/>
                 <input className="form-control"  style={{width:'50%'}} type="text"  onChange={otherUrlChange} value={otherUrl} placeholder="Other URL" />
             
             </p>   

            <input type="button"className="btn btn-success" value="Submit"/>
    </div> 


    </div>
    </div>
    </div>
 
    </div>)
}
export default Interview