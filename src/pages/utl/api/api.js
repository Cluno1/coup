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
      let re=await apiClient.post('/user/register',user);
      
      if(re.data.code===200){
        return re.data.data
      }else{
        return {
          code:500,
          message:'未知报错'
        }
      }

    }catch(err){
      console.error(err)
      return err.response.data
    }
    
  },

  async login(user) {
    try{
      let re=await apiClient.post('/user/login',user);
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

  /**
   * roomName: string;
  playerCount: number;
  isPublic: boolean;
  password: string | null;
  owner: {name: string;
  avatar: string;
  user_rank: string;};
   * @returns 
   */
  async createRoom(data){
    try{
      let re=await apiClient.post('/room/createRoom',data);
      if(re.data.code===200){
        console.log(re);
        return re.data.data.room
      }else{
        alert('其他错误')
        console.log(re);
        return []
      }

    }catch(err){
      console.log(err)
      return []
    }
  },

  async getRoomList(){
    try{
      let re=await apiClient.get('/room/roomList');
      
      if(re.data.code===200){
        
        return re.data.data.roomList
      }else{
        alert('其他错误')
        console.log(re);
      }

    }catch(err){
      console.log(err,'err')
      return []
      
    }
  },
  
};