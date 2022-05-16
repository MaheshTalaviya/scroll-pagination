import {useEffect,useState} from 'react'
import axios from "axios";
import {SERVER_URL} from "../../constants";
import setAuthToken from "../../utils/setAuthToken";
import useRecorder from "../common/useRecorder";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css'
const CommonTable = (props)=>{
  let [audioURL, isRecording, startRecording, stopRecording,audioFileBlob,cancelRecoding,isDelete,isAudioStatus,isMusicLoaderSataus] = useRecorder();

    const [apiRespones,setApiResponse] = useState();
    useEffect(()=>{
    apiCall()
    },[])

    const apiCall=()=>{
       try {
            setAuthToken(); //  Important set token  from res.data to get token
           axios.get(SERVER_URL + "/api/csvData/adminListRecords?status=RECORDINTRO").then((response) => {
              setApiResponse(response.data)
            }, (error) => {
                console.log(error);
             });
        } catch (e) {
       console.log(e)
        }
    }
    
     const [modelDisplay,setModelDisplay]=useState(false)
    const [pushA,setPusha]=useState([]);
    const [userId,setuserId]=useState();
    const [personName,setPersonName]=useState();
     const [radio,setRadio]=useState();
     const radioOnChange=(e)=>{
       console.log('------------>',e)
setRadio(e.currentTarget.value)
     }
     const  modelClose= ()=>{
        setModelDisplay(false)
        setuserId('')
        setPersonName('')
        setPusha([])
    }
    const audioRecord =(userIds,name)=>{
      setuserId(userIds)
      setPersonName(name)
      setModelDisplay(true)
      
    }
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
          
            fileData.append("userId",userId );
            var arrindex = 0
            if(radio){
              arrindex=radio
            }
           
            fileData.append("file",pushA[arrindex ].audioFileBlob );
              
            setAuthToken(); //  Important set token  from res.data to get token
           let  res =  axios.post(SERVER_URL + "/api/csvData/imagesUploads/", fileData,{headers:{'Content-Type':'multipart/form-data'}});
      if(res){
         toast.success('Audio message successfully submited.')
   apiCall()
   modelClose()
      }

    }
   

    return( 
    <><ToastContainer hideProgressBar={true}  />
               <div className="modal" style={{display:modelDisplay?'flex':'none'}}><div className="modal-content" >
    <div class="modal-header">
         <h4>Record Audio of {personName}</h4>
      <span onClick={modelClose} style={{cursor:"pointer"}} className="close">&times;</span>
     
    </div>
    <div className="modal-body">
     <>
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
          
           
     </>
    </div>
   </div>
  </div>
    <table className="table table-bordered">  
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      
      <th scope="col">Info</th>
      
      <th scope="col">City</th>
     
      <th scope="col">Record</th>

       <th scope="col">Submited Audio</th>
       <th scope="col">Interview Link</th>
    </tr>
  </thead>
  <tbody>{
       apiRespones && apiRespones?.data.map((item,index)=>{
            return (<tr>
              <td key={index}>{index+1}</td>
              <td>{item.uname}</td>
              <td>{item.emailId} </td>
             
              <td>{item.info}</td>
            
              <td>{item.city}</td>
            
              <td><input type="button" value="Record Audio" onClick={()=>{audioRecord(item._id,item.uname)}} className="btn btn-warning"/></td>
   <td>{item.audioMessage ?  <audio className="audioClass" src={item.audioMessage} controls  />:''}</td>
           <td><a href={'/user/interviewe/'+item.introId} target="_blank">Link</a></td> </tr>)}) }
              {apiRespones?.data?.length === 0 ?<tr><td colSpan="7" align="center">No any records</td></tr>:null}</tbody></table></>)
} 
export default CommonTable