import {useEffect,useState} from 'react'
import axios from "axios";
import Header from './common/header'
import {SERVER_URL} from "../../constants";
import setAuthToken from "../../utils/setAuthToken";
import useRecorder from "../common/useRecorder";
import { ToastContainer, toast } from 'react-toastify';

  import 'react-toastify/dist/ReactToastify.css'
const AddQueshtions =()=>{
  const user = JSON.parse(window.localStorage.getItem("user"));
    let [audioURL, isRecording, startRecording, stopRecording,audioFileBlob,cancelRecoding,isDelete,isAudioStatus,isMusicLoaderSataus] = useRecorder();
    const [pushA,setPusha]=useState([]);
    const [radio,setRadio]=useState();

      useEffect(()=>{
      if(audioURL){
        let a = pushA
 a.push({audioURL:audioURL,audioFileBlob:audioFileBlob,id:Math.floor(Math.random()*(999-100+1)+100)})
 setPusha(a)
console.log(a)
      }
     
     
    },[audioURL])

    const removeClip=(val)=>{
    let arr=pushA
    let av=arr.filter(item => item.id !== val)
   
      setPusha(av)
    }
    const saveAudio=()=>{
    
var fileData = new FormData();
          
            fileData.append("adminId",user._id );
            var arrindex = 0
            if(radio){
              arrindex=radio
            }
           
            fileData.append("file",pushA[arrindex ].audioFileBlob );
              
            setAuthToken(); //  Important set token  from res.data to get token
           let  res =  axios.post(SERVER_URL + "/api/csvData/addQuestion/", fileData,{headers:{'Content-Type':'multipart/form-data'}});
      if(res){
         toast.success('Audio Question Submited successfully submited.')
  
      }


    }
    const radioOnChange=(e)=>{
        setRadio(e.currentTarget.value)
     }
    return(<div><Header/><ToastContainer hideProgressBar={true}  /> 
     <div className="container">
         <div className="main-div">
           <div className="content">
             <h3>Add Interview Question.</h3>
             <br/>
             <div>
             <div>Record Interview Quesion.</div>
               <div className="audio-class">
       {
         pushA && pushA.map((item,index)=>{
            return (<><div className="d-flex align-items-center mb-3" >  <input type="radio" onChange={radioOnChange} defaultChecked={index===0 ?true: false}  value={index} name="gender" /> &nbsp;&nbsp; Vesion{index+1}   : <audio  className="audioClass" src={item.audioURL} controls  /> <input type="button"  className="crossBtn" value="&#10005;" onClick={()=>{removeClip(item.id)}}  /></div>
  
   </>)
         })
       }
       <input type="button" value="Submit" className="btn btn-success submiteClass" style={{display:pushA && pushA.length !== 0 ?'block':'none'}} onClick={saveAudio} />
              
                {/* <button onClick={cancelRecoding} className="audioBtn"  style={{display:isDelete?'none':'block'}}>
  <i class="fa fa-trash" aria-hidden="true"></i>
      </button> */}
        {/* <img src={preloader} height="100" width="400" style={{display:isMusicLoaderSataus?'block':'none'}} /> */}
      </div>
             <div style={{marginTop:"10px"}}>
              <button onClick={startRecording} className="btn btn-warning" style={{display:isRecording?'none':'block'}}>
               <i class="fa fa-play" aria-hidden="true">  Click to start Recording</i>
              </button>
      <button onClick={stopRecording} className="btn btn-danger"style={{display:!isRecording?'none':'block'}}>
       <i className="fa fa-pause" aria-hidden="true"> Click to stop Recording</i>

      </button>
        </div>
           </div>
         </div>
         </div></div></div>)
}
export default AddQueshtions