import UploadUser from '../components/admin1_components/upload_csv'
import RecordIntro from '../components/admin1_components/recirdIntro'
import AddIntroQueshtions from '../components/admin1_components/addQueshtions'
const ROUTE_ADMIN_PATH=localStorage.getItem('route');
console.log("admin",ROUTE_ADMIN_PATH)
const routes = [
 
      {
        path:"/admin1/uploadUsers",
        Component: UploadUser,
        userType : 'ADMIN1'
    },
     {
        path:"/admin1/recordIntro",
        Component:RecordIntro ,
        userType : 'ADMIN1'
    },
      {
        path:"/admin1/addIntroQuestions",
        Component:AddIntroQueshtions ,
        userType : 'ADMIN1'
    }

    
     
     
    
 
   
];

export default routes;