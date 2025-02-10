import axios from 'axios';
import { baseURL } from '../requestUrl';

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});




export default {
  async register(user) {
    try{
      let re=await apiClient.post('/register',user);
      
      if(re.data.code===200){
        return re.data.data
      }else{
        return {
          code:500,
          message:'未知报错'
        }
      }

    }catch(err){
      alert(err.response.data.message)
      return err.response.data
    }
    
  },

  async login(user) {
    try{
      let re=await apiClient.post('/login',user);
      if(re.data.code===200){
        return re.data.data.user
      }else{
        return {
          code:500,
          message:'未知报错'
        }
      }

    }catch(err){
      alert(err.response.data.message)
      return err.response.data
    }
    
    
    
  },
  
};