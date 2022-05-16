import {useEffect,useState} from 'react'
import axios from "axios";
import {SERVER_URL} from "../../constants";
import setAuthToken from "../../utils/setAuthToken";
import Header from './common/header'
import CommonTable from '../common/commonListTable';

const InstagramList=()=>{
    const [apiRespones,setApiResponse]=useState('')
       
    useEffect(()=>{
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
    },[])
  
    useEffect(()=>{ console.log('apiRespones', apiRespones)},[apiRespones])
    return <div>   <Header/> 
     <div className="container">


       <br/>
        <CommonTable apiRespones={apiRespones} />
    </div></div>
}
export default InstagramList