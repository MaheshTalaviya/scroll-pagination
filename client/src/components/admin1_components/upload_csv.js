import {useState,useEffect} from 'react'
import axios from "axios";
import {SERVER_URL} from "../../constants";
import CSVReader from "react-csv-reader";
import setAuthToken from "../../utils/setAuthToken";
import Header from './common/header'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css'
const UplaodCsv=()=>{

// const [preIdSelect,setPreIdSelect]=useState(true);
// const [postIdSelect,setPostIdSelect]=useState(false);
const [csvObj,setCsvObj]= useState('')  
const [flieData,setFileData]=useState('')
const [loadingStatus,setLoadingStatus]=useState(false)
const [displayDivStatus,setDisplayDivSatatus]=useState(false);
const [apiresponse,setApiResponse]=useState('')

const handleForce = (data, fileInfo) => {
    setFileData(fileInfo)
    setCsvObj(data)
};

const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
};
const submitCsv=()=>{
    if(csvObj!==''){
        var  sendObj={
      
        csvObj:csvObj,
       
    }
       

        const onProgress = {
            onUploadProgress: function(progressEvent) {
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                setLoadingStatus(true)
            }
         }
       
        try {
            setAuthToken(); //  Important set token  from res.data to get token
           axios.post(SERVER_URL + "/api/csvData/add", {
               data:sendObj,
               csvName:flieData.name
            },onProgress).then((response) => {
                setLoadingStatus(false)
                setDisplayDivSatatus(true)
                setApiResponse(response.data?.data)

                console.log(response.data)
             toast.success('CSV file '+flieData.name +' has been uploaded.')
             //setTimeout(function(){   window.location.reload() }, 3000);
            }, (error) => {
                console.log(error);
             });
        } catch (e) {
       console.log(e)
        }

}
}


    return <div>
            <Header/> <ToastContainer hideProgressBar={true}  />
            <div className="container" >
            		<div className="_vertical-center">
            			<div className="main-div">
                          <div className="form-group">
                           
                            </div>
                            
       <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Upload CSV</label>
                                <CSVReader
                                cssClass="react-csv-input"
                              
                                onFileLoaded={handleForce}
                                parserOptions={papaparseOptions}
                                />
                                <div style={{display:loadingStatus?'block':'none'}}>loading...</div>
                            </div>
                             
                            <button type="submit" onClick={submitCsv} className={'btn btn-primary'} style={{marginRight:"5px"}}>Upload </button>
  
                        </div>
                      
                     
                    </div>    
                </div>
            
        </div>
}
export default UplaodCsv