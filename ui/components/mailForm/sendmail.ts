// import axios from "axios";

// export async function sendMailRequest(data:{
//     name: string;
//     email: string;
//     textContent: string;
//     permission: boolean;
// }){
//     try {
//         const response = await axios.post('/api/mail/send', {

//           body: JSON.stringify(data),
//         });
  
//         const result = await response.data;
//         if(result.status===200){
//             sendQuickRes({name,email})
//         }
       
//       } catch (error) {
//         throw error
//       }
    
// }


// export async function sendQuickRes(data:{
//     name: string;
//     email: string;
// }){
//     try {
//         const response = await axios.post('/api/mail/quickResponse', {

//           body: JSON.stringify(data),
//         });
  
//         const result = await response.data;
       
       
//       } catch (error) {
//         throw error
//       }
    
// }